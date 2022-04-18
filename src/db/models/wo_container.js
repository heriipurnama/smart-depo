"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class wo_container extends Model {
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

    wo_container.init(
        {
            wocid:{
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            wonoid: DataTypes.INTEGER,
            ordertype: DataTypes.INTEGER,
            cpopr: DataTypes.STRING,
            cpcust: DataTypes.STRING,
            crno: DataTypes.STRING,
            cccode: DataTypes.STRING,
            ctcode: DataTypes.STRING,
            cclength: DataTypes.DECIMAL,
            ccheight: DataTypes.DECIMAL,
            fe: DataTypes.STRING,
            remark: DataTypes.STRING,
            gatedate: DataTypes.DATE,
            sealno: DataTypes.STRING,

        },
        {
            sequelize,
            modelName: "wo_container",
            underscored: true,
            freezeTableName: true,
            tableName: "wo_container",
            createdAt: false,
            updatedAt: false
        }
    );

    return wo_container;
};
