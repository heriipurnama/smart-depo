"use strict";

const baseResponse = require("../../utils/helper/Response");
const { msk_gudang, msk_gudang_detail, tblwarehouse, debitur} = require("../../db/models");
const Logger = require("../../utils/helper/logger");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

class MskGudangController {
    static async createData(req, res, next) {
        let {
            gudang_detail,
            nomor_polisi,
            nomor_wo,
            cucode,
            type_jenis,
            surat_jalan,
            nomor_si,
            nomor_kontrak,
            tgl_prod,
            tujuan,
            gross_wt,
            nett_wt,
            tgl_terima,
            crtby,
            crton,
            mdfby,
            mdfon,
            wh_id,
        } = req.body;

        try {
            const payload = await msk_gudang.create({
                nomor_polisi: nomor_polisi,
                nomor_wo: nomor_wo,
                cucode: cucode,
                type_jenis: type_jenis,
                surat_jalan: surat_jalan,
                nomor_si: nomor_si,
                nomor_kontrak: nomor_kontrak,
                tgl_prod: tgl_prod,
                tujuan: tujuan,
                gross_wt: gross_wt,
                nett_wt: nett_wt,
                tgl_terima: tgl_terima,
                crtby: crtby,
                crton: crton,
                mdfby: mdfby,
                mdfon: mdfon,
                wh_id: wh_id,
            });

            let masukGud = await msk_gudang.findOne({
                where: {
                    nomor_polisi: nomor_polisi
                }
            });
            let lotConvert = JSON.parse(JSON.stringify(gudang_detail));
            for (let i=0; i<lotConvert.length; i++){
                await msk_gudang_detail.create({
                    msk_id: masukGud.msk_id,
                    nomor_lot: lotConvert[i].lot,
                });
            }

            baseResponse({ message: "succes created mskGudang", data: payload })(
                res,
                200
            );

            Logger(req);
        }catch (error){
            res.status(400);
            next(error);
        }
    }

    static async listAllData(req, res, next) {
        let { offset, limit } = req.query;

        try {
            let offsets = parseInt(offset) || 0;
            let limits = parseInt(limit) || 11;

            let { count, rows: datas } = await msk_gudang.findAndCountAll({
                offset: offsets,
                limit: limits,
                include:[
                    {
                        model: msk_gudang_detail,
                        as: "masukGudangDetail",
                        required: false // do not generate INNER JOIN
                    },
                    {
                        model: tblwarehouse,
                        as: "tblwarehouses",
                        required: false
                    }
                ]
            });
            baseResponse({ message: "list mskGudang", data: { datas, count } })(
                res,
                200
            );
        } catch (error) {
            res.status(403);
            next(error);
        }
    }

    static async updateData(req, res, next) {
        let {
            msk_id,
            nomor_polisi,
            nomor_wo,
            cucode,
            type_jenis,
            surat_jalan,
            nomor_si,
            nomor_kontrak,
            tgl_prod,
            tujuan,
            gross_wt,
            nett_wt,
            tgl_terima,
            crtby,
            crton,
            mdfby,
            mdfon,
            wh_id,
        } = req.body;

        try {
            let dataUsername = await msk_gudang.findOne({
                where: { msk_id: msk_id },
            });

            if (!dataUsername) {
                throw new Error(`mskGudang ${msk_id} doesn't exists!`);
            }

            await msk_gudang.update(
                {
                    nomor_polisi: nomor_polisi,
                    nomor_wo: nomor_wo,
                    cucode: cucode,
                    type_jenis: type_jenis,
                    surat_jalan: surat_jalan,
                    nomor_si: nomor_si,
                    nomor_kontrak: nomor_kontrak,
                    tgl_prod: tgl_prod,
                    tujuan: tujuan,
                    gross_wt: gross_wt,
                    nett_wt: nett_wt,
                    tgl_terima: tgl_terima,
                    crtby: crtby,
                    crton: crton,
                    mdfby: mdfby,
                    mdfon: mdfon,
                    wh_id: wh_id,
                },
                { where: { msk_id: msk_id } }
            );

            baseResponse({
                message: "msk_id updated!",
                data: `mskGudang succes update for msk_id : ${msk_id}`,
            })(res, 200);
            Logger(req);
        } catch (error) {
            res.status(403);
            next(error);
        }
    }

    static async detailData(req, res, next) {
        let { msk_id } = req.body;

        try {
            let payload = await msk_gudang.findOne({ where: { msk_id: msk_id } });

            if (!payload) {
                throw new Error(`msk_id mskGudang: ${msk_id} doesn't exists!`);
            }
            baseResponse({ message: "detail data mskGudang msk_id", data: payload })(
                res,
                200
            );
        } catch (error) {
            res.status(403);
            next(error);
        }
    }

    static async deleteData(req, res, next) {
        let { msk_id } = req.body;

        try {
            let payload = await msk_gudang.destroy({
                where: { msk_id: msk_id },
            });

            if (!payload) {
                throw new Error(`msk_id: ${msk_id} doesn't exists!`);
            }

            let payloadTwo = await msk_gudang_detail.destroy({
                where: { msk_id: msk_id },
            });

            if (!payloadTwo) {
                throw new Error(`msk_id: ${msk_id} doesn't exists!`);
            }

            baseResponse({
                message: `mskGudang deleted for msk_id: ${msk_id}`,
                data: payload,
            })(res, 200);
            Logger(req);
        } catch (error) {
            res.status(400);
            next(error);
        }
    }

    static async getCucode(req, res, next) {
        try {
            let datas = await debitur.sequelize.query(`SELECT cuname, cucode FROM tbldebitur WHERE  cutype ='5' `,
                {
                    type: debitur.SELECT
                }
                );

            baseResponse({ message: "List debitur", data: { datas } })(res, 200);

        }catch (error){
            res.status(403);
            next(error);
        }
    }

    static async getWarehouse(req, res, next) {
        try {
            let datas = await tblwarehouse.sequelize.query(`SELECT * FROM tblwarehouse`,
                {
                    type: tblwarehouse.SELECT
                }
            );
            baseResponse({ message: "List warehouse", data: { datas } })(res, 200);

        }catch (error){
            res.status(403);
            next(error);
        }
    }

}

module.exports = MskGudangController;