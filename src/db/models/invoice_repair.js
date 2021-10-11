"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class invoice_repair extends Model {
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

    invoice_repair.init(
        {
            invno:{
                type: DataTypes.STRING,
                primaryKey: true
            },
            invrno: DataTypes.INTEGER,
            invrcrno: DataTypes.STRING,
            invrtype: DataTypes.STRING,
            invrlength: DataTypes.INTEGER,
            invrin: DataTypes.DATE,
            invrappv: DataTypes.DATE,
            invrcomp: DataTypes.DATE,
            invrcond: DataTypes.STRING,
            invramount: DataTypes.DECIMAL,

        },
        {
            sequelize,
            modelName: "invoice_repair",
            underscored: true,
            freezeTableName: true,
            tableName: "invoice_repair",
            createdAt: false,
            updatedAt: false
        }
    );

    return invoice_repair;
};
