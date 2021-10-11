"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class invoice_lifton extends Model {
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

    invoice_lifton.init(
        {
            invno:{
                type: DataTypes.STRING,
                primaryKey: true
            },
            invnno: DataTypes.INTEGER,
            invncrno: DataTypes.STRING,
            invnvesid: DataTypes.STRING,
            invnvoyno: DataTypes.STRING,
            invntype: DataTypes.STRING,
            invnlength: DataTypes.INTEGER,
            invnterm: DataTypes.STRING,
            invnout: DataTypes.DATE,
            invncond: DataTypes.STRING,
            invnrelease: DataTypes.STRING,
            invnamount: DataTypes.DECIMAL,

        },
        {
            sequelize,
            modelName: "invoice_lifton",
            underscored: true,
            freezeTableName: true,
            tableName: "invoice_lifton",
            createdAt: false,
            updatedAt: false
        }
    );

    return invoice_lifton;
};
