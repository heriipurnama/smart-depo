"use strict";

const baseResponse = require("../../utils/helper/Response");
const { wo_rab} = require("../../db/models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const Logger = require("../../utils/helper/logger");

class WoRabController {
    static async list(req, res, next) {

        try {
            let datas = await wo_rab.sequelize.query(
                `SELECT worabid, wonoid, worabdate, worabno, wocurr, worate, wodescrab1, wonilairab1, 
                wodescrab2, wonilairab2, wodescrab3, wonilairab3, wodescrab4, wonilairab4, wodescrab5, wonilairab5, wodescrab6, 
                wonilairab6, wodescrab7, wonilairab7, wodescrab8, wonilairab8, wodescrab9, wonilairab9, wodescrab10, wonilairab10, 
                wodescrab11, wonilairab11, wodescrab12, wonilairab12, wodescrab13, wonilairab13, wodescrab14, wonilairab14, 
                wodescrab15, wonilairab15, wodescrab16, wonilairab16, wodescrab17, wonilairab17, wodescrab18, wonilairab18, 
                wodescrab19, wonilairab19, wodescrab20, wonilairab20, wonilairab_adm, wototal_pajak, womaterai, wototal_tagihan, 
                wototbiaya_lain, wototpph23 FROM wo_rab 
            `,
                {
                    type: wo_rab.SELECT
                }
            );

            baseResponse({
                message: "List WO RAB",
                data: datas,
            })(res, 200);
        } catch (error) {
            res.status(403);
            next(error);
        }
    }

    static async detailWoRab(req, res, next){
        let { worabid} = req.query;
        try {
            let dataku = await wo_rab.sequelize.query(
                `SELECT worabid, wonoid, worabdate, worabno, wocurr, worate, wodescrab1, wonilairab1,
                        wodescrab2, wonilairab2, wodescrab3, wonilairab3, wodescrab4, wonilairab4, wodescrab5, wonilairab5, wodescrab6,
                        wonilairab6, wodescrab7, wonilairab7, wodescrab8, wonilairab8, wodescrab9, wonilairab9, wodescrab10, wonilairab10,
                        wodescrab11, wonilairab11, wodescrab12, wonilairab12, wodescrab13, wonilairab13, wodescrab14, wonilairab14,
                        wodescrab15, wonilairab15, wodescrab16, wonilairab16, wodescrab17, wonilairab17, wodescrab18, wonilairab18,
                        wodescrab19, wonilairab19, wodescrab20, wonilairab20, wonilairab_adm, wototal_pajak, womaterai, wototal_tagihan,
                        wototbiaya_lain, wototpph23 FROM wo_rab
				 where worabid = '${worabid}'
				 ORDER BY wo_rab.worabid  DESC
            `,
                {
                    type: wo_rab.SELECT,
                }
            );

            baseResponse({
                message: "detail WO RAB",
                data: dataku
            })(res, 200);
        } catch (error) {
            res.status(403);
            next(error);
        }
    }



    static async updateWO(req, res, next){
        let {worabid, wonoid, worabdate, worabno, wocurr, worate, wodescrab1, wonilairab1,
            wodescrab2, wonilairab2, wodescrab3, wonilairab3, wodescrab4, wonilairab4, wodescrab5, wonilairab5, wodescrab6,
            wonilairab6, wodescrab7, wonilairab7, wodescrab8, wonilairab8, wodescrab9, wonilairab9, wodescrab10, wonilairab10,
            wodescrab11, wonilairab11, wodescrab12, wonilairab12, wodescrab13, wonilairab13, wodescrab14, wonilairab14,
            wodescrab15, wonilairab15, wodescrab16, wonilairab16, wodescrab17, wonilairab17, wodescrab18, wonilairab18,
            wodescrab19, wonilairab19, wodescrab20, wonilairab20, wonilairab_adm, wototal_pajak, womaterai, wototal_tagihan,
            wototbiaya_lain, wototpph23} = req.body;
        try{

            let updateWO = await wo_rab.update({
                    wonoid: wonoid,
                    worabdate: worabdate,
                    worabno: worabno,
                    wocurr: wocurr,
                    worate: worate,
                    wodescrab1: wodescrab1,
                    wonilairab1: wonilairab1,
                    wodescrab2: wodescrab2,
                    wonilairab2: wonilairab2,
                    wodescrab3: wodescrab3,
                    wonilairab3: wonilairab3,
                    wodescrab4: wodescrab4,
                    wonilairab4: wonilairab4,
                    wodescrab5: wodescrab5,
                    wonilairab5: wonilairab5,
                    wodescrab6: wodescrab6,
                    wonilairab6: wonilairab6,
                    wodescrab7: wodescrab7,
                    wonilairab7: wonilairab7,
                    wodescrab8: wodescrab8,
                    wonilairab8: wonilairab8,
                    wodescrab9: wodescrab9,
                    wonilairab9: wonilairab9,
                    wodescrab10: wodescrab10,
                    wonilairab10: wonilairab10,
                    wodescrab11: wodescrab11,
                    wonilairab11: wonilairab11,
                    wodescrab12: wodescrab12,
                    wonilairab12: wonilairab12,
                    wodescrab13: wodescrab13,
                    wonilairab13: wonilairab13,
                    wodescrab14: wodescrab14,
                    wonilairab14: wonilairab14,
                    wodescrab15: wodescrab15,
                    wonilairab15: wonilairab15,
                    wodescrab16: wodescrab16,
                    wonilairab16: wonilairab16,
                    wodescrab17: wodescrab17,
                    wonilairab17: wonilairab17,
                    wodescrab18: wodescrab18,
                    wonilairab18: wonilairab18,
                    wodescrab19: wodescrab19,
                    wonilairab19: wonilairab19,
                    wodescrab20: wodescrab20,
                    wonilairab20: wonilairab20,
                    wonilairab_adm: wonilairab_adm,
                    wototal_pajak: wototal_pajak,
                    womaterai: womaterai,
                    wototal_tagihan: wototal_tagihan,
                    wototbiaya_lain: wototbiaya_lain,
                    wototpph23: wototpph23,
                },
                { where: { worabid: worabid } }
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
        let {wonoid, worabdate, worabno, wocurr, worate, wodescrab1, wonilairab1,
            wodescrab2, wonilairab2, wodescrab3, wonilairab3, wodescrab4, wonilairab4, wodescrab5, wonilairab5, wodescrab6,
            wonilairab6, wodescrab7, wonilairab7, wodescrab8, wonilairab8, wodescrab9, wonilairab9, wodescrab10, wonilairab10,
            wodescrab11, wonilairab11, wodescrab12, wonilairab12, wodescrab13, wonilairab13, wodescrab14, wonilairab14,
            wodescrab15, wonilairab15, wodescrab16, wonilairab16, wodescrab17, wonilairab17, wodescrab18, wonilairab18,
            wodescrab19, wonilairab19, wodescrab20, wonilairab20, wonilairab_adm, wototal_pajak, womaterai, wototal_tagihan,
            wototbiaya_lain, wototpph23} = req.body;
        try {

            let payloadWO = await wo_rab.create({
                wonoid: wonoid,
                worabdate: worabdate,
                worabno: worabno,
                wocurr: wocurr,
                worate: worate,
                wodescrab1: wodescrab1,
                wonilairab1: wonilairab1,
                wodescrab2: wodescrab2,
                wonilairab2: wonilairab2,
                wodescrab3: wodescrab3,
                wonilairab3: wonilairab3,
                wodescrab4: wodescrab4,
                wonilairab4: wonilairab4,
                wodescrab5: wodescrab5,
                wonilairab5: wonilairab5,
                wodescrab6: wodescrab6,
                wonilairab6: wonilairab6,
                wodescrab7: wodescrab7,
                wonilairab7: wonilairab7,
                wodescrab8: wodescrab8,
                wonilairab8: wonilairab8,
                wodescrab9: wodescrab9,
                wonilairab9: wonilairab9,
                wodescrab10: wodescrab10,
                wonilairab10: wonilairab10,
                wodescrab11: wodescrab11,
                wonilairab11: wonilairab11,
                wodescrab12: wodescrab12,
                wonilairab12: wonilairab12,
                wodescrab13: wodescrab13,
                wonilairab13: wonilairab13,
                wodescrab14: wodescrab14,
                wonilairab14: wonilairab14,
                wodescrab15: wodescrab15,
                wonilairab15: wonilairab15,
                wodescrab16: wodescrab16,
                wonilairab16: wonilairab16,
                wodescrab17: wodescrab17,
                wonilairab17: wonilairab17,
                wodescrab18: wodescrab18,
                wonilairab18: wonilairab18,
                wodescrab19: wodescrab19,
                wonilairab19: wonilairab19,
                wodescrab20: wodescrab20,
                wonilairab20: wonilairab20,
                wonilairab_adm: wonilairab_adm,
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
        let {worabid} = req.body;
        try{
            let payload = await wo_rab.destroy({
                where: { worabid : worabid }
            });

            if (!payload) {
                throw new Error(`worabid: ${worabid} doesn't exists!`);
            }

            baseResponse({
                message: "Success delete Data",
                data: payload
            })(res, 200);

        } catch(error){
            res.status(403);
            next(error);
        }
    }

}

module.exports = WoRabController;
