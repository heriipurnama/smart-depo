"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class container_repair_detail extends Model {
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

    container_repair_detail.init(
        {
            svid:{
                type: DataTypes.STRING,
                primaryKey: true
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
            modelName: "container_repair_detail",
            underscored: true,
            freezeTableName: true,
            tableName: "container_repair_detail",
            createdAt: false,
            updatedAt: false
        }
    );

    return container_repair_detail;
};
