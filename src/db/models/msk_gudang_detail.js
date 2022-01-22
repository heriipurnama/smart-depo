"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class msk_gudang_detail extends Model {
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
        }
    }

    msk_gudang_detail.init(
        {
            mskd_id:{
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            msk_id: DataTypes.INTEGER,
            nomor_lot: DataTypes.STRING,

        },
        {
            sequelize,
            modelName: "msk_gudang_detail",
            underscored: true,
            freezeTableName: true,
            tableName: "msk_gudang_d",
            createdAt: false,
            updatedAt: false
        }
    );

    return msk_gudang_detail;
};
