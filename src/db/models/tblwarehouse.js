"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class tblwarehouse extends Model {
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

    tblwarehouse.init(
        {
            wh_id:{
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            whcode: DataTypes.STRING,
            wh_name: DataTypes.STRING,

        },
        {
            sequelize,
            modelName: "tblwarehouse",
            underscored: true,
            freezeTableName: true,
            tableName: "tblwarehouse",
            createdAt: false,
            updatedAt: false
        }
    );

    return tblwarehouse;
};
