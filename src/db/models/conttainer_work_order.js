"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class container_work_order extends Model {
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

    container_work_order.init(
        {
            wono:{
                type: DataTypes.STRING,
                primaryKey: true
            },
            wodate: DataTypes.DATE,
            wocomp: DataTypes.INTEGER,
            woto: DataTypes.STRING,
            wocc: DataTypes.STRING,
            wofrom: DataTypes.STRING,
            woopr: DataTypes.STRING,
            wonotes: DataTypes.STRING,
            wotype: DataTypes.INTEGER,
            wocrton: DataTypes.DATE,
            wocrtby: DataTypes.STRING,
            womdfon: DataTypes.DATE,
            womdfby: DataTypes.STRING,

        },
        {
            sequelize,
            modelName: "container_work_order",
            underscored: true,
            freezeTableName: true,
            tableName: "container_work_order",
            createdAt: false,
            updatedAt: false
        }
    );

    return container_work_order;
};
