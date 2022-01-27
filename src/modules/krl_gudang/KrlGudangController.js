"use strict";

const baseResponse = require("../../utils/helper/Response");
const { krl_gudang, krl_gudang_detail} = require("../../db/models");
const Logger = require("../../utils/helper/logger");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

class KrlGudangController{
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
            tgl_keluar,
            crtby,
            crton,
            mdfby,
            mdfon,
            wh_id,
        } = req.body;

        try {
            const payload = await krl_gudang.create({
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
                tgl_keluar: tgl_keluar,
                crtby: crtby,
                crton: crton,
                mdfby: mdfby,
                mdfon: mdfon,
                wh_id: wh_id,
            });

            let keluarGud = await krl_gudang.findOne({
                where: {
                    nomor_polisi: nomor_polisi
                }
            });
            let lotConvert = JSON.parse(JSON.stringify(gudang_detail));
            for (let i=0; i<lotConvert.length; i++){
                await krl_gudang_detail.create({
                    krl_id: keluarGud.krl_id,
                    nomor_lot: lotConvert[i],
                });
            }

            baseResponse({ message: "succes created KrlGudang", data: payload })(
                res,
                200
            );

            Logger(req);
        }catch (error){
            res.status(400);
            next(error);
        }
    }

}

module.exports = KrlGudangController;