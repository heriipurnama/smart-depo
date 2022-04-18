"use strict";

const baseResponse = require("../../utils/helper/Response");
const { work_order, company} = require("../../db/models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const Logger = require("../../utils/helper/logger");

class OtherWorkOrderController {
    static async list(req, res, next) {
        let {limit, offset, search} = req.query;

        let limits = limit !== undefined ? limit : 10;
        let offsets = offset !== undefined ? offset : 0;
        let searchs = search !== undefined ?  ` wono LIKE '%${search}%' ` : ` wono LIKE '%%' `;

        try {
            let datas = await work_order.sequelize.query(
                `SELECT wonoid, wono, wodate, woto, wocc, wofrom, woopr, wotype, wopraoderin, wopraoderout, 
                wostok, wosinum, wonotes, wocrton, wocrtby, womdfon, womdfby FROM work_order 
				where ${searchs} ORDER BY wono  DESC  LIMIT ${limits} OFFSET ${offsets}
            `,
                {
                    type: work_order.SELECT
                }
            );

            let TotalDatas = await work_order.sequelize.query(
                `SELECT count(*) As Total
				 FROM work_order
				 ORDER BY wono  DESC `,
                {
                    type: work_order.SELECT,
                }
            );

            let allData = datas[0];
            let totalDatas = Object.values(TotalDatas[0][0])[0];

            baseResponse({
                message: "List work order other",
                data: { datas: allData, Total: totalDatas },
            })(res, 200);
        } catch (error) {
            res.status(403);
            next(error);
        }
    }

    static async detailWoHeader(req, res, next){
        let {wonoid} = req.query;
        try {
            let dataku = await work_order.sequelize.query(
                `SELECT wono, wodate, woto, wocc, wofrom, woopr, wotype, wopraoderin, wopraoderout, 
                    wostok, wosinum, wonotes, wocrton, wocrtby, womdfon, womdfby FROM work_order
				 where wonoid = '${wonoid}'
				 ORDER BY work_order.wonoid  DESC
            `,
                {
                    type: work_order.SELECT,
                }
            );

            baseResponse({
                message: "detail work order other",
                data: dataku
            })(res, 200);
        } catch (error) {
            res.status(403);
            next(error);
        }
    }



    static async updateWO(req, res, next){
        let {wonoid, wono, wodate, woto, wocc, wofrom, woopr, wotype, wopraoderin, wopraoderout, wostok, wosinum, wonotes, wocrton, wocrtby, womdfon, womdfby} = req.body;
        try{

            let updateWO = await work_order.update({
                wono: wono,
                wodate: wodate,
                woto: woto,
                wocc: wocc,
                wofrom: wofrom,
                woopr: woopr,
                wotype: wotype,
                wopraoderin: wopraoderin,
                wopraoderout: wopraoderout,
                wostok: wostok,
                wosinum: wosinum,
                wonotes: wonotes,
                wocrton: wocrton,
                wocrtby: wocrtby,
                womdfon: womdfon,
                womdfby: womdfby,
            },
                { where: { wonoid: wonoid } }
            );

            baseResponse({
                message: "Success Update Data",
                data: updateWO
            })(res, 200);

        } catch(error){
            res.status(403);
            next(error);
        }
    }

    static async insertData(req, res, next){
        let {wono, wodate, woto, wocc, wofrom, woopr, wotype, wopraoderin, wopraoderout, wostok, wosinum, wonotes, wocrton, wocrtby, womdfon, womdfby} = req.body;
        try {

            /**
             * Format
             * prefix[SV] + 'paktrasl' + 'sdcode' + 8digit_number
             */

                // get data company.
            let resultCompany = await company.findAll({});
            let paktrasl = resultCompany[0].dataValues.paktrasl;
            let sdcode = resultCompany[0].dataValues.sdcode;
            let prefixCode = "WOD";

            // get data repo order
            let resultSurvey = await work_order.findOne({
                where: {
                    wono: { [Op.like]: `%WOD%`}
                },
                order:[[ "wono", "DESC"]]
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

            let payloadWO = await work_order.create({
                wono: resultCode,
                wodate: wodate,
                woto: woto,
                wocc: wocc,
                wofrom: wofrom,
                woopr: woopr,
                wotype: wotype,
                wopraoderin: wopraoderin,
                wopraoderout: wopraoderout,
                wostok: wostok,
                wosinum: wosinum,
                wonotes: wonotes,
                wocrton: wocrton,
                wocrtby: wocrtby,
                womdfon: womdfon,
                womdfby: womdfby,
            });

            baseResponse({
                message: "Success Insert Data",
                data: payloadWO
            })(res, 200);
        } catch (error) {
            res.status(403);
            next(error);
        }
    }

    static async deleteWO(req, res, next){
        let {wonoid} = req.body;
        try{
            let payload = await work_order.destroy({
                where: { wonoid : wonoid }
            });

            if (!payload) {
                throw new Error(`wonoid: ${wonoid} doesn't exists!`);
            }

            baseResponse({
                message: "Success delete Data",
                data: deleteWO
            })(res, 200);

        } catch(error){
            res.status(403);
            next(error);
        }
    }

}

module.exports = OtherWorkOrderController;
