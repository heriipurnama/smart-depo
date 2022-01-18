"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class msk_gudang extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // container.belongsTo(models.container,
            // {
            // 	foreignKey: 'ctcode',
            // })
            msk_gudang.hasMany(models.msk_gudang_detail,
                {
                    foreignKey: {
                        name: "msk_id"
                    }, as : "mskGudangDetails"
                });
            msk_gudang.belongsTo(models.tblwarehouse,
                {
                    foreignKey: {
                        name: "wh_id"
                    }, as : "tblwarehouse"
                });
        }
    }

    msk_gudang.init(
        {
            msk_id:{
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            wh_id: DataTypes.INTEGER,
            nomor_polisi: DataTypes.STRING,
            nomor_wo: DataTypes.STRING,
            cucode: DataTypes.STRING,
            type_jenis: DataTypes.STRING,
            surat_jalan: DataTypes.STRING,
            nomor_si: DataTypes.STRING,
            nomor_kontrak: DataTypes.STRING,
            tgl_prod: DataTypes.DATE,
            tujuan: DataTypes.STRING,
            gross_wt: DataTypes.INTEGER,
            nett_wt: DataTypes.INTEGER,
            tgl_masuk: DataTypes.DATE,
            crtby: DataTypes.INTEGER,
            crton: DataTypes.DATE,
            mdfby: DataTypes.INTEGER,
            mdfon: DataTypes.DATE,

        },
        {
            sequelize,
            modelName: "msk_gudang",
            underscored: true,
            freezeTableName: true,
            tableName: "msk_gudang",
            createdAt: false,
            updatedAt: false
        }
    );

    return msk_gudang;
};
