"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class invoice_storage extends Model {
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

    invoice_storage.init(
        {
            invno:{
                type: DataTypes.STRING,
                primaryKey: true
            },
            invsno: DataTypes.INTEGER,
            invscrno: DataTypes.STRING,
            invstype: DataTypes.STRING,
            invslength: DataTypes.INTEGER,
            invsvesid: DataTypes.STRING,
            invsvoyno: DataTypes.STRING,
            invsin: DataTypes.DATE,
            invsfrom: DataTypes.DATE,
            invsto: DataTypes.DATE,
            invscond: DataTypes.STRING,
            invsreceive: DataTypes.STRING,
            invsrelease: DataTypes.STRING,
            invsday: DataTypes.INTEGER,
            invsfree: DataTypes.INTEGER,
            invsday_free: DataTypes.INTEGER,
            invslong: DataTypes.INTEGER,
            invsamount: DataTypes.DECIMAL,

        },
        {
            sequelize,
            modelName: "invoice_storage",
            underscored: true,
            freezeTableName: true,
            tableName: "invoice_storage",
            createdAt: false,
            updatedAt: false
        }
    );

    return invoice_storage;
};
