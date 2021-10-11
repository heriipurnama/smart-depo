"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class invoice_repo extends Model {
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

    invoice_repo.init(
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
            modelName: "invoice_repo",
            underscored: true,
            freezeTableName: true,
            tableName: "invoice_repo",
            createdAt: false,
            updatedAt: false
        }
    );

    return invoice_repo;
};
