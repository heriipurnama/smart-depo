"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class invoice extends Model {
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

    invoice.init(
        {
            invno:{
                type: DataTypes.STRING,
                primaryKey: true
            },
            invrefno: DataTypes.STRING,
            invtype: DataTypes.INTEGER,
            invcrton: DataTypes.DATE,
            invcrtby: DataTypes.INTEGER,
            invmdfon: DataTypes.DATE,
            invmdfby: DataTypes.STRING,
            invdate: DataTypes.DATE,
            invprcode: DataTypes.STRING,
            invcucode: DataTypes.STRING,
            invdate1: DataTypes.DATE,
            invdate2: DataTypes.DATE,
            invautno: DataTypes.STRING,
            invcurr: DataTypes.STRING,
            invdebtur: DataTypes.STRING,
            invdpcode: DataTypes.STRING,
            invsdcode: DataTypes.STRING,
            invsubtotal: DataTypes.DECIMAL,
            invadd1: DataTypes.DECIMAL,
            invadd2: DataTypes.DECIMAL,
            invadd3: DataTypes.DECIMAL,
            invadd4: DataTypes.DECIMAL,
            invadd5: DataTypes.DECIMAL,
            invsub1: DataTypes.DECIMAL,
            invsub2: DataTypes.DECIMAL,
            invtotal: DataTypes.DECIMAL,

        },
        {
            sequelize,
            modelName: "invoice",
            underscored: true,
            freezeTableName: true,
            tableName: "invoice",
            createdAt: false,
            updatedAt: false
        }
    );

    return invoice;
};
