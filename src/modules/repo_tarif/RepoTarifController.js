"use strict";

const baseResponse = require("../../utils/helper/Response");
const { tblrepo_tarif, damageTariff, container_process} = require("../../db/models");
const Logger = require("../../utils/helper/logger");

class RepoTarifController {

    static async createData(req, res, next) {
        let {
            prcode, rtno, rtdate, rtexpdate, rtremarks } = req.body;

        try {

            const payload = await tblrepo_tarif.create({
                prcode: prcode,
                rtno: rtno,
                rtdate: rtdate,
                rtexpdate: rtexpdate,

                rtremarks: rtremarks
            });

            let data = await tblrepo_tarif.sequelize.query(
                ` UPDATE tblprincipal
                  SET prcontractno = '${rtno}'
                  WHERE prcode = '${prcode}'
            `,
                {
                    type: tblrepo_tarif.UPDATE,
                }
            );

            baseResponse({ message: "succes created Repo Tariff", data: payload })(res, 200);
        } catch (error) {
            res.status(400);
            next(error);
        }
    }

    static async listAllData(req, res, next){
        let {limit, offset, search} = req.query;

        let limits = limit !== undefined ? limit : 11;
        let offsets = offset !== undefined ? offset : 0;
        let searchs = search !== undefined ?  ` prcode LIKE '%${search}%' ` : ` prcode LIKE '%%' `;

        try {

            let datas = await tblrepo_tarif.sequelize.query(
                `SELECT prcode, rtno, rtdate, rtexpdate, rtremarks
				 FROM tblrepo_tariff WHERE ${searchs} ORDER BY prcode DESC LIMIT ${limits} OFFSET ${offsets}
            `,
                {
                    type: tblrepo_tarif.SELECT
                }
            );

            let TotalDatas = await tblrepo_tarif.sequelize.query(
                `SELECT count(*) As Total
                 FROM tblrepo_tariff `,
                {
                    type: damageTariff.SELECT,
                }
            );

            let allData = datas[0];
            let totalDatas = Object.values(TotalDatas[0][0])[0];

            baseResponse({
                message: "List iso repair",
                data: { datas: allData, Total: totalDatas },
            })(res, 200);
        } catch (error) {
            res.status(403);
            next(error);
        }
    }

    static async detailData(req, res, next) {
        let { prcode, rtno } = req.body;

        try {
            let payload = await tblrepo_tarif.findOne(
                { where: { prcode : prcode,
                        rtno : rtno}}
            );

            if (!payload) {
                throw new Error(`prcode Repo Tariff: ${prcode} doesn't exists!`);
            }
            baseResponse({ message: "Detail data Repo Tariff prcode", data: payload })(res, 200);
        } catch (error) {
            res.status(403);
            next(error);
        }
    }

    static async updateData(req, res, next) {
        let {
            prcode, rtno, rtdate, rtexpdate, rtremarks } = req.body;

        try {

            let dataUsername = await tblrepo_tarif.findOne({
                where: { prcode: prcode, rtno: rtno }
            });

            if (!dataUsername) {
                throw new Error(`prcode repo tariff ${prcode} doesn't exists!`);
            }

            await tblrepo_tarif.update(
                {
                    prcode: prcode,
                    rtno: rtno,
                    rtdate: rtdate,
                    rtexpdate: rtexpdate,
                    rtremarks: rtremarks
                },
                { where: { prcode: prcode, rtno: rtno } }
            );

            let data = await tblrepo_tarif.sequelize.query(
                ` UPDATE tblprincipal
                  SET prcontractno = '${rtno}'
                  WHERE prcode = '${prcode}'
            `,
                {
                    type: tblrepo_tarif.UPDATE,
                }
            );

            baseResponse({ message: "prcode updated!", data:`repo tariff  succes update for prcode : ${prcode}` })(res, 200);
            Logger(req);
        } catch (error) {
            res.status(403);
            next(error);
        }
    }

    static async deleteData(req, res, next){
        let { prcode } = req.body;

        try {
            let payload = await tblrepo_tarif.destroy({
                where: { prcode : prcode }
            });

            if (!payload) {
                throw new Error(`prcode: ${prcode} doesn't exists!`);
            }

            baseResponse({ message: `prcode: ${prcode} deleted succes`, data: payload })(res, 200);
            Logger(req);
        } catch (error) {
            res.status(400);
            next(error);
        }
    }

}

module.exports = RepoTarifController;
