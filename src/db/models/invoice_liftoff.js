"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class invoice_liftoff extends Model {
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

    invoice_liftoff.init(
        {
            invno:{
                type: DataTypes.STRING,
                primaryKey: true
            },
            invfno: DataTypes.INTEGER,
            invfcrno: DataTypes.STRING,
            invfvesid: DataTypes.STRING,
            invfvoyno: DataTypes.STRING,
            invftype: DataTypes.STRING,
            invflength: DataTypes.INTEGER,
            invfterm: DataTypes.STRING,
            invfin: DataTypes.DATE,
            invfcond: DataTypes.STRING,
            invfreceive: DataTypes.STRING,
            invfamount: DataTypes.DECIMAL,

        },
        {
            sequelize,
            modelName: "invoice_liftoff",
            underscored: true,
            freezeTableName: true,
            tableName: "invoice_liftoff",
            createdAt: false,
            updatedAt: false
        }
    );

    return invoice_liftoff;
};
