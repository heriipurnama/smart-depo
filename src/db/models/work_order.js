"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class work_order extends Model {
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

    work_order.init(
        {
            wonoid:{
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            wono:  DataTypes.STRING,
            wodate:  DataTypes.DATE,
            woto:  DataTypes.STRING,
            wocc:  DataTypes.STRING,
            wofrom:  DataTypes.STRING,
            woopr:  DataTypes.STRING,
            wotype:  DataTypes.INTEGER,
            wopraoderin:  DataTypes.INTEGER,
            wopraoderout:  DataTypes.INTEGER,
            wostok:  DataTypes.INTEGER,
            wosinum:  DataTypes.STRING,
            wonotes:  DataTypes.STRING,
            wocrton:  DataTypes.DATE,
            wocrtby:  DataTypes.STRING,
            womdfon:  DataTypes.DATE,
            womdfby:  DataTypes.STRING,
            wodoro: DataTypes.STRING,

        },
        {
            sequelize,
            modelName: "work_order",
            underscored: true,
            freezeTableName: true,
            tableName: "work_order",
            createdAt: false,
            updatedAt: false
        }
    );

    return work_order;
};
