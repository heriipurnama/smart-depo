"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class isorepair extends Model {
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

    isorepair.init(
        {
            isoid:{
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            mtcode: DataTypes.STRING,
            comp_code: DataTypes.STRING,
            comp_description: DataTypes.STRING,
            repair_code: DataTypes.STRING,
            repair_description: DataTypes.STRING,
            material: DataTypes.STRING,
            formula: DataTypes.STRING,
            also_applies_to: DataTypes.STRING,
            locations: DataTypes.STRING,
            cccodes: DataTypes.STRING,
            _limit: DataTypes.INTEGER,
            _start: DataTypes.INTEGER,
            _hours: DataTypes.DECIMAL,
            _mtrlcost: DataTypes.DECIMAL,
            _inc: DataTypes.DECIMAL,
            _inchours: DataTypes.DECIMAL,
            _incmtrlcost: DataTypes.DECIMAL,
            _hoursidr: DataTypes.DECIMAL,
            _laborcostidr: DataTypes.DECIMAL,
            _mtrlcostidr: DataTypes.DECIMAL,

        },
        {
            sequelize,
            modelName: "isorepair",
            underscored: true,
            freezeTableName: true,
            tableName: "isorepair",
            createdAt: false,
            updatedAt: false
        }
    );

    return isorepair;
};
