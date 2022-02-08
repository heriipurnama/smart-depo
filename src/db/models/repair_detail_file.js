"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class  repair_detail_file extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate() {
            // define association here
        }
    }

    repair_detail_file.init(
        {
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            svid: {
                type: DataTypes.STRING
            },
            rpid: DataTypes.DECIMAL,
            url: DataTypes.STRING,
            file_time_upload: DataTypes.DATE,
            flag: DataTypes.INTEGER,

        },
        {
            sequelize,
            modelName: "repairDetailFile",
            underscored: true,
            freezeTableName: true,
            tableName: "repair_detail_file",
            createdAt: false,
            updatedAt: false
        }
    );

    return repair_detail_file;
};
