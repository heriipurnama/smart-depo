"use strict";
const jwt = require("jsonwebtoken");

const baseResponse = require("../../utils/helper/Response");
const { container_process, company, container } = require("../../db/models");
const Logger = require("../../utils/helper/logger");

class PraInController {
	static async createNewData(req, res, next) {
		let {
			CRNO,
			CPOPR,
			CPCUST,
			CPDEPO,
			SPDEPO,
			CPIFE,
			CPICARGO,
			CPIPRATGL,
			CPIREFIN,
			CPIVES,
			CPIDISH,
			CPIDISDAT,
			CPIJAM,
			CPICHRGBB,
			CPIDELIVER,
			CPIORDERNO,
			CPISHOLD,
			CPIREMARK,
			CPIVOYID,
			CPIVOY,
			CPISTATUS,
			MTCODE,
			CCCODE,
		} = req.body;

		let bearerheader = req.headers["authorization"];
		const splitBearer = bearerheader.split(" ");
		const bearer = splitBearer[1];

		// eslint-disable-next-line no-undef
		let datas = jwt.verify(bearer, process.env.SECRET_KEY);
		let usernameByToken = datas.username;

		try {
			/**
			 * Format CONTAINER PROCESS CODE
			 * prefix[CP] + 'paktrasl' + 'sdcode' + 8digit_number
			 */

			// get data company.
			let resultCompany = await company.findAll({});
			let paktrasl = resultCompany[0].dataValues.paktrasl;
			let sdcode = resultCompany[0].dataValues.sdcode;
			let prefixCode = "CP";

			// get data container process
			let resultOrderPra = await container_process.findOne({
				order: [["cpid", "DESC"]],
			});

			let resultCode;
			if (resultOrderPra === null) {
				resultCode = `${prefixCode}${paktrasl}${sdcode}00000001`;
			} else {
				let resultDataOrderPra = resultOrderPra.dataValues.cpid;
				let resultSubstringDataOrderPra = resultDataOrderPra.substring(7, 16);
				let convertInt = parseInt(resultSubstringDataOrderPra) + 1;

				let str = "" + convertInt;
				let pad = "00000000";
				let number = pad.substring(0, pad.length - str.length) + str;
				resultCode = `${prefixCode}${paktrasl}${sdcode}${number}`;
			}

			let CPITERM = "CY";
			let someDate = new Date();
			let dateFormated = someDate.toISOString().substr(0, 10);

			const payload = await container_process.sequelize.query(
				`
				INSERT INTO container_process (CPID,CRNO,CPOPR,CPCUST,CPDEPO,SPDEPO,CPIFE,CPITERM,CPICARGO,CPIPRATGL,CPIREFIN,CPIVES,CPIDISH,
					CPIDISDAT,CPIJAM,CPICHRGBB,CPIDELIVER,CPIORDERNO,CPISHOLD,CPIREMARK,CPIVOYID,CPIVOY,CPISTATUS,CPICRTON,CPICRTBY)
				VALUES ('${resultCode}','${CRNO}','${CPOPR}','${CPCUST}','${CPDEPO}','${SPDEPO}','${CPIFE}','${CPITERM}',
				'${CPICARGO}','${CPIPRATGL}','${CPIREFIN}','${CPIVES}','${CPIDISH}','${CPIDISDAT}','${CPIJAM}','${CPICHRGBB}',
				'${CPIDELIVER}','${CPIORDERNO}','${CPISHOLD}','${CPIREMARK}','${CPIVOYID}','${CPIVOY}','${CPISTATUS}',
				'${dateFormated}','${usernameByToken}')
				`
			);

			// get data container process
			let resultDataContainer = await container.findOne({
				where: { CRNO: CRNO },
			});

			let resultContainer;
			if (!resultDataContainer) {
				const payload = await container.create({
					crno: CRNO,
					cccode: CCCODE,
					mtcode: MTCODE,
					crlastact: "BI",
					crcpid: resultCode,
				});
				resultContainer = {
					data: payload,
					message: "Succes Insert Data Container",
				};
			} else {
				const payload = await container.update(
					{ crlastact: "BI", crcpid: resultCode },
					{ where: { crno: CRNO } }
				);
				// eslint-disable-next-line no-unused-vars
				resultContainer = {
					data: payload,
					message: "Succes Update Data Container",
				};
				console.log("payload", payload);
			}

			baseResponse({
				message: "Succes Created Container Process",
				data: {
					"container process": payload,
					"data container": resultContainer,
				},
			})(res, 200);
			Logger(req);
		} catch (error) {
			res.status(400);
			next(error);
		}
	}
}

module.exports = PraInController;
