"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class container_interchange extends Model {
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

    container_interchange.init(
        {
            chgid: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            chgorderno: DataTypes.STRING,
            crgno: DataTypes.STRING,
            chgopr: DataTypes.STRING,
            chgcust: DataTypes.STRING,
            chgdate: DataTypes.DATE,
            chgnote: DataTypes.STRING,
            chgcrtby: DataTypes.STRING,
            chgcrton: DataTypes.DATE,
            chgmdfby: DataTypes.STRING,
            chgmdfon: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "container_interchange",
            underscored: true,
            freezeTableName: true,
            tableName: "container_interchange",
            createdAt: false,
            updatedAt: false
        }
    );

    Object.defineProperty(container_interchange.prototype, "entity", {
        get() {
            return {
                dycode: this.dycode,
                dydesc: this.dydesc,
                dyclean: this.dyclean
            };
        },
    });

    return container_interchange;
};
