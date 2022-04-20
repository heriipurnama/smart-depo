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
                wodescbiaya2, wobiaya2, wodescbiaya3, wobiaya3, wodescbiaya4, wobiaya4, wodescbiaya5, wobiaya5,
                        wodescbiaya6, wobiaya6, wodescbiaya7, wobiaya7, wobiaya_adm, 
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
        let { wonoid} = req.query;
        try {
            let dataku = await wo_recept.sequelize.query(
                `SELECT woreceptid, wonoid, woreceptdate, woreceptno, wocurr, worate, wodescbiaya1, wobiaya1,
                        wodescbiaya2, wobiaya2, wodescbiaya3, wobiaya3, wodescbiaya4, wobiaya4, wodescbiaya5, wobiaya5,
                        wodescbiaya6, wobiaya6, wodescbiaya7, wobiaya7, wobiaya_adm,
                        wototal_pajak, womaterai, wototal_tagihan, wototbiaya_lain, wototpph23 FROM wo_recept
				 where wonoid = '${wonoid}'
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
            wodescbiaya2, wobiaya2, wodescbiaya3, wobiaya3, wodescbiaya4, wobiaya4, wodescbiaya5, wobiaya5,
            wodescbiaya6, wobiaya6, wodescbiaya7, wobiaya7, wobiaya_adm,
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
                    wodescbiaya6: wodescbiaya6,
                    wobiaya6: wobiaya6,
                    wodescbiaya7: wodescbiaya7,
                    wobiaya7: wobiaya7,
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
            wodescbiaya2, wobiaya2, wodescbiaya3, wobiaya3, wodescbiaya4, wobiaya4, wodescbiaya5, wobiaya5,
            wodescbiaya6, wobiaya6, wodescbiaya7, wobiaya7, wobiaya_adm,
            wototal_pajak, womaterai, wototal_tagihan, wototbiaya_lain, wototpph23} = req.body;
        try {

            let payloadWO = await wo_recept.create({
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
                wodescbiaya6: wodescbiaya6,
                wobiaya6: wobiaya6,
                wodescbiaya7: wodescbiaya7,
                wobiaya7: wobiaya7,
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
