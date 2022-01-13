"use strict";

const baseResponse = require("../../utils/helper/Response");
const { isorepair} = require("../../db/models");
const Logger = require("../../utils/helper/logger");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

class MnrTarifController{

    static async createNew(req, res, next) {
        let {
            isoid,
            mtcode,
            comp_code,
            comp_description,
            repair_code,
            repair_description,
            material,
            formula,
            also_applies_to,
            locations,
            cccodes,
            limit,
            start,
            hours,
            mtrl_cost,
            inc,
            inc_hours,
            inc_mtrl_cost,
            crtby,
            crton,
            mdfby,
            mdfon } = req.body;

        try {

            const [payload, created] = await isorepair.findOrCreate({
                where: {
                    isoid: isoid,
                },
                defaults: {
                    mtcode: mtcode,
                    comp_code: comp_code,
                    comp_description: comp_description,
                    repair_code: repair_code,
                    repair_description: repair_description,
                    material: material,
                    formula: formula,
                    also_applies_to: also_applies_to,
                    locations: locations,
                    cccodes: cccodes,
                    limit: limit,
                    start: start,
                    hours: hours,
                    mtrl_cost: mtrl_cost,
                    inc: inc,
                    inc_hours: inc_hours,
                    inc_mtrl_cost: inc_mtrl_cost,
                    crtby: crtby,
                    crton: crton,
                    mdfby: mdfby,
                    mdfon: mdfon,
                },
            });
            if (created === false) {
                throw new Error(`Isorepair Exist, isoid: ${isoid} exists!`);
            } else {
                baseResponse({ message: "Isorepair Created ", data: payload })(
                    res,
                    200
                );
                Logger(req);
            }
        } catch (error) {
            res.status(400);
            next(error);
        }
    }

    static async update(req, res, next) {
        let {
            isoid,
            mtcode,
            comp_code,
            comp_description,
            repair_code,
            repair_description,
            material,
            formula,
            also_applies_to,
            locations,
            cccodes,
            limit,
            start,
            hours,
            mtrl_cost,
            inc,
            inc_hours,
            inc_mtrl_cost,
            crtby,
            crton,
            mdfby,
            mdfon } = req.body;

        let dataUpdate = {
            isoid: isoid,
            mtcode: mtcode,
            comp_code: comp_code,
            comp_description: comp_description,
            repair_code: repair_code,
            repair_description: repair_description,
            material: material,
            formula: formula,
            also_applies_to: also_applies_to,
            locations: locations,
            cccodes: cccodes,
            limit: limit,
            start: start,
            hours: hours,
            mtrl_cost: mtrl_cost,
            inc: inc,
            inc_hours: inc_hours,
            inc_mtrl_cost: inc_mtrl_cost,
            crtby: crtby,
            crton: crton,
            mdfby: mdfby,
            mdfon: mdfon,
        };
        let selector = {
            where: { isoid: isoid },
        };
        try {
            let mnrTarifId = isoid;
            let dataMnrTarif = await isorepair.update(dataUpdate, selector);

            if (!dataMnrTarif) {
                throw new Error(`isorepair ${mnrTarifId} doesn't exists!`);
            }
            baseResponse({
                message: "Update Success",
                data: dataMnrTarif,
            })(res, 200);
            Logger(req);
        } catch (error) {
            res.status(403);
            next(error);
        }
    }

    static async listOne(req, res, next) {
        let { isoid } = req.body;

        try {
            let dataMnrTarif = await isorepair.findOne({
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
                where: {
                    isoid: isoid,
                },
            });

            if (!dataMnrTarif) {
                throw new Error(`isorepair isoid: ${isoid} doesn't exists!`);
            }
            baseResponse({
                message: "Get Data Success",
                data: dataMnrTarif,
            })(res, 200);
        } catch (error) {
            res.status(403);
            next(error);
        }
    }

    static async list(req, res, next) {
        let {start, rows, search, orderColumn, orderType} = req.body;
        let oc = (orderColumn == "")?"isoid":orderColumn;
        let ot = (orderType == "")?"DESC":orderType;
        try {
            let { count, rows: datas } = await isorepair.findAndCountAll({
                offset: start,
                limit: rows,
                include:[{
                    required: false, // do not generate INNER JOIN
                }],
                where: {
                    [Op.or]: [
                        { isoid : { [Op.like]: `%${search}%`} },
                        { mtcode :{ [Op.like]: `%${search}%`}},
                        { comp_code :{ [Op.like]: `%${search}%`}},
                        { comp_description :{ [Op.like]: `%${search}%`}},
                        { repair_code :{ [Op.like]: `%${search}%`}},
                        { repair_description :{ [Op.like]: `%${search}%`}}
                    ]
                },
                order: [[ oc, ot]]
            });
            baseResponse({ message: "list isorepair isoid", data: { datas, count } })(
                res,
                200
            );
        } catch (error) {
            res.status(403);
            next(error);
        }
    }

    static async delete(req, res, next) {
        let { isoid } = req.body;
        try {
            let payload = await isorepair.destroy({
                where: { isoid: isoid },
            });
            baseResponse({ message: "Success Delete isorepair isoid", data: payload })(
                res,
                200
            );
            Logger(req);
        } catch (error) {
            res.status(403);
            next(error);
        }
    }

}
module.exports = MnrTarifController;