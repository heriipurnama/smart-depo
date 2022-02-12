"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class con_repair_detail_temp extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate() {
            // define association here
            // container.belongsTo(models.container,
            // {
            // 	foreignKey: 'ctcode',
            // })
        }
    }

    con_repair_detail_temp.init(
        {
            svid: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            rpid: DataTypes.INTEGER,
            rdno: DataTypes.INTEGER,
            rdsize: DataTypes.STRING,
            muname: DataTypes.STRING,
            rdmu: DataTypes.STRING,
            rdhitung: DataTypes.DECIMAL,
            rdqty: DataTypes.DECIMAL,
            rdmhr: DataTypes.DECIMAL,
            rdcurr: DataTypes.STRING,
            rdlabrate: DataTypes.DECIMAL,
            rdlab: DataTypes.DECIMAL,
            rdmat: DataTypes.DECIMAL,
            rdtotal: DataTypes.DECIMAL,
            rdapp: DataTypes.INTEGER,
            rdappdate: DataTypes.DATE,
            rdpic: DataTypes.STRING,
            rdcomp: DataTypes.INTEGER,
            rdcompdate: DataTypes.DATE,
            rdloc: DataTypes.STRING,
            rdcom: DataTypes.STRING,
            rddmtype: DataTypes.STRING,
            rdrepmtd: DataTypes.STRING,
            rdcalmtd: DataTypes.STRING,
            rddesc: DataTypes.STRING,
            rdmateri: DataTypes.STRING,
            rdteb: DataTypes.STRING,
            rdaccount: DataTypes.STRING,
            rdmhract: DataTypes.DECIMAL,
            rdqtyact: DataTypes.DECIMAL,
            rdqtya: DataTypes.DECIMAL,
            rdsizea: DataTypes.STRING,
            rdtotala: DataTypes.DECIMAL,
            rdmhra: DataTypes.DECIMAL,
            rdlaba: DataTypes.DECIMAL,
            rdmata: DataTypes.DECIMAL,
        },
        {
            sequelize,
            modelName: "con_repair_detail_temp",
            underscored: true,
            freezeTableName: true,
            tableName: "con_repair_detail_temp",
            createdAt: false,
            updatedAt: false,
        }
    );

    return con_repair_detail_temp;
};
