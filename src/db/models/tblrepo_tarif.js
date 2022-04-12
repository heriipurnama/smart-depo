"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class tblrepo_tarif extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }

    }
    tblrepo_tarif.init(
        {
            prcode: {
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false
            },
            rtno: DataTypes.STRING,
            rtdate: DataTypes.DATE,
            rtexpdate: DataTypes.DATE,
            rtremarks: DataTypes.STRING

        },
        {
            sequelize,
            tableName: "tblrepo_tariff",
            freezeTableName: true,
            modelName: "tblrepo_tarif",
            underscored: true,
            timestamps: false
        }
    );

    return tblrepo_tarif;
};
