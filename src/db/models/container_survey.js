"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes, QueryTypes) => {
    class container_survey extends Model {
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

    container_survey.init(
        {
            bid:{
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            svid: DataTypes.STRING,
            cpid: DataTypes.STRING,
            syid: DataTypes.STRING,
            svcrno: DataTypes.STRING,
            svtype: DataTypes.STRING,
            svsurdat: DataTypes.DATE,
            svcond: DataTypes.STRING,
            svnotes: DataTypes.STRING,
            svcrton: DataTypes.DATE,
            svcrtby: DataTypes.STRING,
            svmdfon: DataTypes.DATE,
            svmdfby: DataTypes.STRING,
            svcurr: DataTypes.STRING,
            svtariff: DataTypes.DECIMAL,
            svprint: DataTypes.STRING,
            svrpid: DataTypes.INTEGER,
            type: DataTypes.STRING,
            rmcode: DataTypes.STRING,

        },
        {
            sequelize,
            modelName: "container_survey",
            underscored: true,
            freezeTableName: true,
            tableName: "container_survey",
            createdAt: false,
            updatedAt: false
        }
    );

    return container_survey;
};
