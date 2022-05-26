"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class wo_rab extends Model {
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

    wo_rab.init(
        {
            worabid:{
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            wonoid: DataTypes.INTEGER,
            worabdate: DataTypes.DATE,
            worabno: DataTypes.STRING,
            wocurr: DataTypes.STRING,
            worate: DataTypes.DECIMAL,
            wodescrab1: DataTypes.STRING,
            wonilairab1: DataTypes.DECIMAL,
            wodescrab2: DataTypes.STRING,
            wonilairab2: DataTypes.DECIMAL,
            wodescrab3: DataTypes.STRING,
            wonilairab3: DataTypes.DECIMAL,
            wodescrab4: DataTypes.STRING,
            wonilairab4: DataTypes.DECIMAL,
            wodescrab5: DataTypes.STRING,
            wonilairab5: DataTypes.DECIMAL,
            wodescrab6: DataTypes.STRING,
            wonilairab6: DataTypes.DECIMAL,
            wodescrab7: DataTypes.STRING,
            wonilairab7: DataTypes.DECIMAL,
            wodescrab8: DataTypes.STRING,
            wonilairab8: DataTypes.DECIMAL,
            wodescrab9: DataTypes.STRING,
            wonilairab9: DataTypes.DECIMAL,
            wodescrab10: DataTypes.STRING,
            wonilairab10: DataTypes.DECIMAL,
            wodescrab11: DataTypes.STRING,
            wonilairab11: DataTypes.DECIMAL,
            wodescrab12: DataTypes.STRING,
            wonilairab12: DataTypes.DECIMAL,
            wodescrab13: DataTypes.STRING,
            wonilairab13: DataTypes.DECIMAL,
            wodescrab14: DataTypes.STRING,
            wonilairab14: DataTypes.DECIMAL,
            wodescrab15: DataTypes.STRING,
            wonilairab15: DataTypes.DECIMAL,
            wodescrab16: DataTypes.STRING,
            wonilairab16: DataTypes.DECIMAL,
            wodescrab17: DataTypes.STRING,
            wonilairab17: DataTypes.DECIMAL,
            wodescrab18: DataTypes.STRING,
            wonilairab18: DataTypes.DECIMAL,
            wodescrab19: DataTypes.STRING,
            wonilairab19: DataTypes.DECIMAL,
            wodescrab20: DataTypes.STRING,
            wonilairab20: DataTypes.DECIMAL,
            wonilairab_adm: DataTypes.DECIMAL,
            wototal_pajak: DataTypes.DECIMAL,
            womaterai: DataTypes.DECIMAL,
            wototal_tagihan: DataTypes.DECIMAL,
            wototbiaya_lain: DataTypes.DECIMAL,
            wototpph23: DataTypes.DECIMAL,

        },
        {
            sequelize,
            modelName: "wo_rab",
            underscored: true,
            freezeTableName: true,
            tableName: "wo_rab",
            createdAt: false,
            updatedAt: false
        }
    );

    return wo_rab;
};
