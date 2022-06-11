"use strict";

const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Op = Sequelize.Op;

const baseResponse = require("../../utils/helper/Response");
const { orderContainerRepo, company } = require("../../db/models");
const Logger = require("../../utils/helper/logger");
const logger= require("../../utils/logger");

class OrderContainerRepoController {
	static async createData(req, res, next) {
		let {
			reorderno,
			redate,
			retype,
			retfrom,
			retto,
			replace1,
			readdr,
			recity,
			redline,
			rebilltype,
			relift,
			reclift,
			revlift,
			redoc,
			recdoc,
			revdoc,
			rechaul20,
			rechaultot20,
			rechaul40,
			rechaultot40,
			rechaul45,
			rechaultot45,
			subtotcur,
			re20,
			retot20,
			re40,
			retot40,
			re45,
			retot45,
			subtotbreak,
			subtotpack,
			totpack,
			totbreak,
			subtotcurbreak,
			subtotcurpack,
			subtotcurcharge1,
			subtotcurcharge2,
			totcurall,
			recpack20,
			recpacktot20,
			recpack40,
			recpacktot40,
			recpack45,
			recpacktot45,
			revpack20,
			revpacktot20,
			revpack40,
			revpacktot40,
			revpack45,
			revpacktot45,
			reappv,
			reother1,
			reother2,
			reautno,
			rebill,
			reismtcon,
			reischarged,
			cpopr,
			cpcust,
			recpives,
			recpivoyid,
			repovendor,
			repofe,
			rebillingto, rtportcharger20,
			rtportcharger40,
			rttruck20,
			rttruck40,
			reportchargertot20,
			reportchargertot40,
			retrucktot20,
			retrucktot40,
		} = req.body;

		let bearerheader = req.headers["authorization"];
		const splitBearer = bearerheader.split(" ");
		const bearer = splitBearer[1];

		// eslint-disable-next-line no-undef
		let datas = jwt.verify(bearer, process.env.SECRET_KEY);
		let usernameByToken = datas.username;

		try {
			const payload = await orderContainerRepo.create({
				reorderno: reorderno,
				redate: redate,
				retype: retype,
				retfrom: retfrom,
				retto: retto,
				replace1: replace1,
				readdr: readdr,
				recity: recity,
				redline: redline,
				rebilltype: rebilltype,
				relift: relift,
				reclift: reclift,
				revlift: revlift,
				redoc: redoc,
				recdoc: recdoc,
				revdoc: revdoc,
				rechaul20: rechaul20,
				rechaultot20: rechaultot20,
				rechaul40: rechaul40,
				rechaultot40: rechaultot40,
				rechaul45: rechaul45,
				rechaultot45: rechaultot45,
				subtotcur: subtotcur,
				re20: re20,
				retot20: retot20,
				re40: re40,
				retot40: retot40,
				re45: re45,
				retot45: retot45,
				subtotbreak: subtotbreak,
				subtotpack: subtotpack,
				totpack: totpack,
				totbreak: totbreak,
				subtotcurbreak: subtotcurbreak,
				subtotcurpack: subtotcurpack,
				subtotcurcharge1: subtotcurcharge1,
				subtotcurcharge2: subtotcurcharge2,
				totcurall: totcurall,
				recpack20: recpack20,
				recpacktot20: recpacktot20,
				recpack40: recpack40,
				recpacktot40: recpacktot40,
				recpack45: recpack45,
				recpacktot45: recpacktot45,
				revpack20: revpack20,
				revpacktot20: revpacktot20,
				revpack40: revpack40,
				revpacktot40: revpacktot40,
				revpack45: revpack45,
				revpacktot45: revpacktot45,
				reappv: reappv,
				reother1: reother1,
				reother2: reother2,
				reautno: reautno,
				rebill: rebill,
				reismtcon: reismtcon,
				reischarged: reischarged,
				recrtby: usernameByToken,
				recrton: new Date(),
				remdfby: usernameByToken,
				remdfon: new Date(),
				cpopr: cpopr,
				cpcust: cpcust,
				recpives: recpives,
				recpivoyid: recpivoyid,
				repovendor: repovendor,
				repofe:repofe,
				rebillingto: rebillingto,
				reportcharger20: rtportcharger20,
				reportcharger40: rtportcharger40,
				retruck20: rttruck20,
				retruck40: rttruck40,
				reportchargertot20: reportchargertot20,
				reportchargertot40: reportchargertot40,
				retrucktot20: retrucktot20,
				retrucktot40: retrucktot40,
			});

			baseResponse({
				message: "succes created orderContainerRepo",
				data: payload,
			})(res, 200);
			Logger(req);
		} catch (error) {
			logger.log({ level: 'error', message: error.stack });
			res.status(400);
			next(error);
		}
	}

	static async listAllData(req, res, next) {
		let { offset, limit } = req.query;

		try {
			let offsets = parseInt(offset) || 0;
			let limits = parseInt(limit) || 11;
			let reorder = "RI";

			let { count, rows: datas } = await orderContainerRepo.findAndCountAll({
				where: { reorderno: { [Op.like]: `%${reorder}%` } },
				offset: offsets,
				limit: limits,
				order:[[ "repoid", "DESC"]]
			});
			baseResponse({
				message: "list orderContainerRepo",
				data: { datas, count },
			})(res, 200);
		} catch (error) {
			logger.log({ level: 'error', message: error.stack });
			res.status(403);
			next(error);
		}
	}

	//List Repo Out
	static async listAllDataOut(req, res, next) {
		let { offset, limit } = req.query;

		try {
			let offsets = parseInt(offset) || 0;
			let limits = parseInt(limit) || 11;
			let reorder = "RO";

			let { count, rows: datas } = await orderContainerRepo.findAndCountAll({
				where: { reorderno: { [Op.like]: `%${reorder}%` } },
				offset: offsets,
				limit: limits,
				order:[[ "repoid", "DESC"]]
			});
			baseResponse({
				message: "list orderContainerRepo",
				data: { datas, count },
			})(res, 200);
		} catch (error) {
			logger.log({ level: 'error', message: error.stack });
			res.status(403);
			next(error);
		}
	}

	static async detailData(req, res, next) {
		let { reorderno } = req.body;

		try {
			let payload = await orderContainerRepo.findOne({
				where: { reorderno: reorderno },
			});

			if (!payload) {
				throw new Error(
					`prcode orderContainerRepo: ${reorderno} doesn't exists!`
				);
			}
			baseResponse({
				message: "detail data orderContainerRepo reorderno",
				data: payload,
			})(res, 200);
		} catch (error) {
			logger.log({ level: 'error', message: error.stack });
			res.status(403);
			next(error);
		}
	}

	static async updateData(req, res, next) {
		let {
			reorderno,
			redate,
			retype,
			retfrom,
			retto,
			replace1,
			readdr,
			recity,
			redline,
			rebilltype,
			relift,
			reclift,
			revlift,
			redoc,
			recdoc,
			revdoc,
			rechaul20,
			rechaultot20,
			rechaul40,
			rechaultot40,
			rechaul45,
			rechaultot45,
			subtotcur,
			re20,
			retot20,
			re40,
			retot40,
			re45,
			retot45,
			subtotbreak,
			subtotpack,
			totpack,
			totbreak,
			subtotcurbreak,
			subtotcurpack,
			subtotcurcharge1,
			subtotcurcharge2,
			totcurall,
			recpack20,
			recpacktot20,
			recpack40,
			recpacktot40,
			recpack45,
			recpacktot45,
			revpack20,
			revpacktot20,
			revpack40,
			revpacktot40,
			revpack45,
			revpacktot45,
			reappv,
			reother1,
			reother2,
			reautno,
			rebill,
			reismtcon,
			reischarged,
			cpopr,
			cpcust,
			repoid,
			recpives,
			recpivoyid,
			repovendor,
			repofe,
			rebillingto, rtportcharger20,
			rtportcharger40,
			rttruck20,
			rttruck40,
			reportchargertot20,
			reportchargertot40,
			retrucktot20,
			retrucktot40,
		} = req.body;

		let bearerheader = req.headers["authorization"];
		const splitBearer = bearerheader.split(" ");
		const bearer = splitBearer[1];

		// eslint-disable-next-line no-undef
		let datas = jwt.verify(bearer, process.env.SECRET_KEY);
		let usernameByToken = datas.username;

		try {
			let dataUsername = await orderContainerRepo.findOne({
				where: { reorderno: reorderno },
			});

			if (!dataUsername) {
				throw new Error(`orderContainerRepo ${reorderno} doesn't exists!`);
			}

			await orderContainerRepo.update(
				{
					redate: redate,
					retype: retype,
					retfrom: retfrom,
					retto: retto,
					replace1: replace1,
					readdr: readdr,
					recity: recity,
					redline: redline,
					rebilltype: rebilltype,
					relift: relift,
					reclift: reclift,
					revlift: revlift,
					redoc: redoc,
					recdoc: recdoc,
					revdoc: revdoc,
					rechaul20: rechaul20,
					rechaultot20: rechaultot20,
					rechaul40: rechaul40,
					rechaultot40: rechaultot40,
					rechaul45: rechaul45,
					rechaultot45: rechaultot45,
					subtotcur: subtotcur,
					re20: re20,
					retot20: retot20,
					re40: re40,
					retot40: retot40,
					re45: re45,
					retot45: retot45,
					subtotbreak: subtotbreak,
					subtotpack: subtotpack,
					totpack: totpack,
					totbreak: totbreak,
					subtotcurbreak: subtotcurbreak,
					subtotcurpack: subtotcurpack,
					subtotcurcharge1: subtotcurcharge1,
					subtotcurcharge2: subtotcurcharge2,
					totcurall: totcurall,
					recpack20: recpack20,
					recpacktot20: recpacktot20,
					recpack40: recpack40,
					recpacktot40: recpacktot40,
					recpack45: recpack45,
					recpacktot45: recpacktot45,
					revpack20: revpack20,
					revpacktot20: revpacktot20,
					revpack40: revpack40,
					revpacktot40: revpacktot40,
					revpack45: revpack45,
					revpacktot45: revpacktot45,
					reappv: reappv,
					reother1: reother1,
					reother2: reother2,
					reautno: reautno,
					rebill: rebill,
					reismtcon: reismtcon,
					reischarged: reischarged,
					remdfby: usernameByToken,
					remdfon: new Date(),
					cpopr: cpopr,
					cpcust: cpcust,
					repoid: repoid,
					recpives: recpives,
					recpivoyid: recpivoyid,
					repovendor: repovendor,
					repofe:repofe,
					rebillingto: rebillingto,
					reportcharger20: rtportcharger20,
					reportcharger40: rtportcharger40,
					retruck20: rttruck20,
					retruck40: rttruck40,
					reportchargertot20: reportchargertot20,
					reportchargertot40: reportchargertot40,
					retrucktot20: retrucktot20,
					retrucktot40: retrucktot40,
				},
				{ where: { reorderno: reorderno } }
			);

			baseResponse({
				message: "reorderno updated!",
				data: `orderContainerRepo succes update for reorderno : ${reorderno}`,
			})(res, 200);
			Logger(req);
		} catch (error) {
			logger.log({ level: 'error', message: error.stack });
			res.status(403);
			next(error);
		}
	}

	static async deleteData(req, res, next) {
		let { reorderno } = req.body;

		try {
			let payload = await orderContainerRepo.destroy({
				where: { reorderno: reorderno },
			});

			if (!payload) {
				throw new Error(`reorderno: ${reorderno} doesn't exists!`);
			}

			baseResponse({
				message: `orderContainerRepo deleted for reorderno: ${reorderno}`,
				data: payload,
			})(res, 200);
			Logger(req);
		} catch (error) {
			logger.log({ level: 'error', message: error.stack });
			res.status(400);
			next(error);
		}
	}

	static async createOrderRepoNumber(req, res, next) {
		let { repoCode } = req.query;
		try {
			/**
			 * Format PRAIN CODE
			 * prefix[RI/RO] + 'paktrasl' + 'sdcode' + 8digit_number
			 */

			// get data company.
			let resultCompany = await company.findAll({});
			let paktrasl = resultCompany[0].dataValues.paktrasl;
			let sdcode = resultCompany[0].dataValues.sdcode;
			let prefixCode = repoCode || "RI";

			// get data repo order

			let resultOrderRepo = await orderContainerRepo.findOne({
				where: { reorderno: { [Op.like]: `${prefixCode}%` } },
				order: [["reorderno", "DESC"]],
			});

			if (resultOrderRepo === null) {
				const resultCode = `${prefixCode}${paktrasl}${sdcode}00000001`;
				baseResponse({
					message: "Success Created Unix Code",
					data: resultCode,
				})(res, 200);
			} else {
				let resultDataOrderRepo = resultOrderRepo.dataValues.reorderno;
				let resultSubstringDataOrderRepo = resultDataOrderRepo.substring(7, 16);
				let convertInt = parseInt(resultSubstringDataOrderRepo) + 1;

				let str = "" + convertInt;
				let pad = "00000000";
				let number = pad.substring(0, pad.length - str.length) + str;
				const resultCode = `${prefixCode}${paktrasl}${sdcode}${number}`;

				baseResponse({
					message: "Success Created Unix Code",
					data: resultCode,
				})(res, 200);
			}
		} catch (error) {
			logger.log({ level: 'error', message: error.stack });
			res.status(500);
			next(error);
		}
	}
}

module.exports = OrderContainerRepoController;
