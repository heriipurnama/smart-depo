"use strict";

const baseResponse = require("../../utils/helper/Response");
const { wo_recept, company} = require("../../db/models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const Logger = require("../../utils/helper/logger");

class WoReceptController {
    static async list(req, res, next) {

        try {
            let datas = await wo_recept.sequelize.query(
                `SELECT woreceptid, wonoid, woreceptdate, woreceptno, wocurr, worate, wodescbiaya1, wobiaya1, 
                wodescbiaya2, wobiaya2, wodescbiaya3, wobiaya3, wodescbiaya4, wobiaya4, wodescbiaya5, wobiaya5, wobiaya_adm, 
                wototal_pajak, womaterai, wototal_tagihan, wototbiaya_lain, wototpph23 FROM wo_recept 
            `,
                {
                    type: wo_recept.SELECT
                }
            );

            baseResponse({
                message: "List work order other",
                data: datas,
            })(res, 200);
        } catch (error) {
            res.status(403);
            next(error);
        }
    }

    static async detailWoRecept(req, res, next){
        let {woreceptid} = req.query;
        try {
            let dataku = await wo_recept.sequelize.query(
                `SELECT wonoid, woreceptdate, woreceptno, wocurr, worate, wodescbiaya1, wobiaya1,
                        wodescbiaya2, wobiaya2, wodescbiaya3, wobiaya3, wodescbiaya4, wobiaya4, wodescbiaya5, wobiaya5, wobiaya_adm,
                        wototal_pajak, womaterai, wototal_tagihan, wototbiaya_lain, wototpph23 FROM wo_recept
				 where woreceptid = '${woreceptid}'
				 ORDER BY wo_recept.woreceptid  DESC
            `,
                {
                    type: wo_recept.SELECT,
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
        let {woreceptid, wonoid, woreceptdate, woreceptno, wocurr, worate, wodescbiaya1, wobiaya1,
            wodescbiaya2, wobiaya2, wodescbiaya3, wobiaya3, wodescbiaya4, wobiaya4, wodescbiaya5, wobiaya5, wobiaya_adm,
            wototal_pajak, womaterai, wototal_tagihan, wototbiaya_lain, wototpph23} = req.body;
        try{

            let updateWO = await wo_recept.update({
                    wonoid: wonoid,
                    woreceptdate: woreceptdate,
                    woreceptno: woreceptno,
                    wocurr: wocurr,
                    worate: worate,
                    wodescbiaya1: wodescbiaya1,
                    wobiaya1: wobiaya1,
                    wodescbiaya2: wodescbiaya2,
                    wobiaya2: wobiaya2,
                    wodescbiaya3: wodescbiaya3,
                    wobiaya3: wobiaya3,
                    wodescbiaya4: wodescbiaya4,
                    wobiaya4: wobiaya4,
                    wodescbiaya5: wodescbiaya5,
                    wobiaya5: wobiaya5,
                    wobiaya_adm: wobiaya_adm,
                    wototal_pajak: wototal_pajak,
                    womaterai: womaterai,
                    wototal_tagihan: wototal_tagihan,
                    wototbiaya_lain: wototbiaya_lain,
                    wototpph23: wototpph23,
                },
                { where: { woreceptid: woreceptid } }
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
        let {wonoid, woreceptdate, woreceptno, wocurr, worate, wodescbiaya1, wobiaya1,
            wodescbiaya2, wobiaya2, wodescbiaya3, wobiaya3, wodescbiaya4, wobiaya4, wodescbiaya5, wobiaya5, wobiaya_adm,
            wototal_pajak, womaterai, wototal_tagihan, wototbiaya_lain, wototpph23} = req.body;
        try {

            /**
             * Format
             * prefix[SV] + 'paktrasl' + 'sdcode' + 8digit_number
             */

                // get data company.
            let resultCompany = await company.findAll({});
            let paktrasl = resultCompany[0].dataValues.paktrasl;
            let sdcode = resultCompany[0].dataValues.sdcode;
            let prefixCode = "WOR";

            // get data repo order
            let resultSurvey = await wo_recept.findOne({
                where: {
                    wonoid: { [Op.like]: `%WOR%`}
                },
                order:[[ "wonoid", "DESC"]]
            });
            var resultCode;
            if (resultSurvey === null) {

                resultCode = `${prefixCode}${paktrasl}${sdcode}00000001`;
            } else {

                let resultDataSurvey = resultSurvey.dataValues.wonoid;
                let resultSubstringDataSurvey = resultDataSurvey.substring(7,16);
                let convertInt = parseInt(resultSubstringDataSurvey) + 1;

                let str = "" + convertInt;
                let pad = "00000000";
                let number = pad.substring(0, pad.length - str.length) + str;
                resultCode = `${prefixCode}${paktrasl}${sdcode}${number}`;

            }

            let payloadWO = await wo_recept.create({
                wonoid: resultCode,
                woreceptdate: woreceptdate,
                woreceptno: woreceptno,
                wocurr: wocurr,
                worate: worate,
                wodescbiaya1: wodescbiaya1,
                wobiaya1: wobiaya1,
                wodescbiaya2: wodescbiaya2,
                wobiaya2: wobiaya2,
                wodescbiaya3: wodescbiaya3,
                wobiaya3: wobiaya3,
                wodescbiaya4: wodescbiaya4,
                wobiaya4: wobiaya4,
                wodescbiaya5: wodescbiaya5,
                wobiaya5: wobiaya5,
                wobiaya_adm: wobiaya_adm,
                wototal_pajak: wototal_pajak,
                womaterai: womaterai,
                wototal_tagihan: wototal_tagihan,
                wototbiaya_lain: wototbiaya_lain,
                wototpph23: wototpph23,
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
        let {woreceptid} = req.body;
        try{
            let payload = await wo_recept.destroy({
                where: { woreceptid : woreceptid }
            });

            if (!payload) {
                throw new Error(`woreceptid: ${woreceptid} doesn't exists!`);
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

module.exports = WoReceptController;
