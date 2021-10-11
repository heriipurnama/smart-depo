"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class invoice_cleaning extends Model {
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

    invoice_cleaning.init(
        {
            invno:{
                type: DataTypes.STRING,
                primaryKey: true
            },
            invcno: DataTypes.STRING,
            invccrno: DataTypes.INTEGER,
            invcvesid: DataTypes.DATE,
            invcvoyno: DataTypes.INTEGER,
            invcexcargo: DataTypes.DATE,
            invctype: DataTypes.STRING,
            invclength: DataTypes.DATE,
            invcterm: DataTypes.STRING,
            invcdatein: DataTypes.STRING,
            invccond: DataTypes.DATE,
            invcreceive: DataTypes.DATE,
            invcdesc: DataTypes.STRING,
            invcamount: DataTypes.STRING,

        },
        {
            sequelize,
            modelName: "invoice_cleaning",
            underscored: true,
            freezeTableName: true,
            tableName: "invoice_cleaning",
            createdAt: false,
            updatedAt: false
        }
    );

    return invoice_cleaning;
};
