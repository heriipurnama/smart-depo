"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class krl_gudang_detail extends Model {
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

    krl_gudang_detail.init(
        {
            krld_id:{
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            krl_id: DataTypes.INTEGER,
            nomor_lot: DataTypes.STRING,

        },
        {
            sequelize,
            modelName: "krl_gudang_detail",
            underscored: true,
            freezeTableName: true,
            tableName: "krl_gudang_d",
            createdAt: false,
            updatedAt: false
        }
    );

    return krl_gudang_detail;
};
