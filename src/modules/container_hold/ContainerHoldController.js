"use strict";

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const baseResponse = require("../../utils/helper/Response");
const {container_hold, container_repair, company, container_work_order} = require("../../db/models");
const Logger = require("../../utils/helper/logger");

class ContainerHoldController {
    static async list(req, res, next) {
        let {limit, offset, search} = req.query;

		let limits = limit !== undefined ? limit : 10;
		let offsets = offset !== undefined ? offset : 0;
		let searchs = search !== undefined ?  ` crno LIKE '%${search}%' ` : ` crno LIKE '%%' `;

		try {
			let datas = await container_hold.sequelize.query(
				`SELECT  chorderno, crno, chtype, chfrom, chto, chnote, chcrtby, chcrton, chmdfby, chmdfon
                 FROM container_hold WHERE ${searchs} ORDER BY chcrton DESC LIMIT ${limits} OFFSET ${offsets}
            `,
            {
                type: container_hold.SELECT
            }
            );

			let TotalDatas = await container_hold.sequelize.query(
				`SELECT count(*) As Total
                 FROM container_hold `,
				{
					type: container_hold.SELECT,
				}
			);

			let allData = datas[0];
			let totalDatas = Object.values(TotalDatas[0][0])[0];

			baseResponse({
				message: "List WO",
				data: { datas: allData, Total: totalDatas },
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

    static async insertData(req, res, next){
        let {chorderno, crno, chtype, chfrom, chto, chnote, chcrtby, chcrton, chmdfby, chmdfon} = req.body;
        try {

            /**
             * Format
             * prefix[SV] + 'paktrasl' + 'sdcode' + 8digit_number
             */

                // get data company.
            let resultCompany = await company.findAll({});
            let paktrasl = resultCompany[0].dataValues.paktrasl;
            let sdcode = resultCompany[0].dataValues.sdcode;
            let prefixCode = "CH";

            // get data repo order
            let resultSurvey = await container_hold.findOne({
                where: {
                    chorderno: { [Op.like]: `%CH%`}
                },
                order:[[ "chorderno", "DESC"]]
            });
            var resultCode;
            if (resultSurvey === null) {

                resultCode = `${prefixCode}${paktrasl}${sdcode}00000001`;
            } else {

                let resultDataSurvey = resultSurvey.dataValues.wono;
                let resultSubstringDataSurvey = resultDataSurvey.substring(7,16);
                let convertInt = parseInt(resultSubstringDataSurvey) + 1;

                let str = "" + convertInt;
                let pad = "00000000";
                let number = pad.substring(0, pad.length - str.length) + str;
                resultCode = `${prefixCode}${paktrasl}${sdcode}${number}`;

            }

            let payloadHold = await container_hold.create({
                chorderno: resultCode,
                crno: crno,
                chtype: chtype,
                chfrom: chfrom,
                chto: chto,
                chnote: chnote,
                chcrtby: chcrtby,
                chcrton: chcrton,
                chmdfby: chmdfby,
                chmdfon: chmdfon,
            });

            let uptcont = await container_repair.sequelize.query(`
                        UPDATE tblcontainer set lastact = '${chtype}' WHERE crno ='${crno}' `,
                {
                    type: container_repair.INSERT
                });

            baseResponse({
                message: "Success Insert Data",
                data: payloadHold
            })(res, 200);
        } catch (error) {
            res.status(403);
            next(error);
        }
    }

    static async detailConHold(req, res, next){
        let {chorderno} = req.query;
        try {
            let datas = await container_hold.sequelize.query(
                `SELECT  chorderno, crno, chtype, chfrom, chto, chnote, chcrtby, chcrton, chmdfby, chmdfon
                 FROM container_hold WHERE chorderno = '${chorderno}'
            `,
                {
                    type: container_hold.SELECT
                }
            );

            baseResponse({
                message: "detail header data",
                data: datas
            })(res, 200);
        } catch (error) {
            res.status(403);
            next(error);
        }
    }

    static async deleteConHold(req, res, next){
        let {lastact, crno} = req.body;
        try{

            let deleteConHold = await container_repair.sequelize.query(`
                    UPDATE tblcontainer set lastact = '${lastact}' WHERE crno ='${crno}' `,
                {
                    type: container_repair.INSERT
                });

            baseResponse({
                message: "Success delete Data",
                data: deleteConHold
            })(res, 200);

        } catch(error){
            res.status(403);
            next(error);
        }
    }

}

module.exports = ContainerHoldController;