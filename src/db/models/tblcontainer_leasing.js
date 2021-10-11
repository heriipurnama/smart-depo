"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class tblcontainer_leasing extends Model {
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

    tblcontainer_leasing.init(
        {
            leorderno:{
                type: DataTypes.STRING,
                primaryKey: true
            },
            leorderdate: DataTypes.DATE,
            letype: DataTypes.INTEGER,
            leinterdate: DataTypes.DATE,
            ledate: DataTypes.DATE,
            leopr1: DataTypes.STRING,
            lecust1: DataTypes.STRING,
            leopr2: DataTypes.STRING,
            lecust2: DataTypes.STRING,
            lenotes: DataTypes.STRING,
            lecrton: DataTypes.DATE,
            lecrtby: DataTypes.STRING,
            lemdfon: DataTypes.DATE,
            lemdfby: DataTypes.STRING,
            leclearno: DataTypes.STRING,
            leinterno: DataTypes.STRING,
            leexcleardate: DataTypes.DATE,
            lecontractno: DataTypes.STRING,
            ledateon: DataTypes.DATE,
            lelocon: DataTypes.STRING,
            lecontype: DataTypes.STRING,
            leremarks: DataTypes.STRING,
            leorderinterno: DataTypes.STRING,

        },
        {
            sequelize,
            modelName: "container_leasing",
            underscored: true,
            freezeTableName: true,
            tableName: "tblcontainer_leasing",
            createdAt: false,
            updatedAt: false
        }
    );

    return tblcontainer_leasing;
};
