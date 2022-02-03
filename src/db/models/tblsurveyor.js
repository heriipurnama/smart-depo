"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class tblsurveyor extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }

    }
    tblsurveyor.init(
        {
            syid: {
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: true
            },
            syname: DataTypes.STRING,
            systatus: DataTypes.STRING
        },
        {
            sequelize,
            tableName: "tblsurveyor",
            freezeTableName: true,
            modelName: "tblsurveyor",
            underscored: true,
            timestamps: false
        }
    );

    return tblsurveyor;
};
