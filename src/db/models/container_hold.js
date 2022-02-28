"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class container_hold extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // component.belongsTo(models.container_code,
            // {
            //     foreignKey: "cmcode",
            // });
        }
    }

    container_hold.init(
        {
            chid:{
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            chorderno: DataTypes.STRING,
            chtype: DataTypes.STRING,
            chfrom: DataTypes.STRING,
            chto: DataTypes.STRING,
            chnote: DataTypes.STRING,
            chcrtby: DataTypes.STRING,
            chcrton: DataTypes.DATE,
            chmdfby: DataTypes.STRING,
            chmdfon: DataTypes.DATE,
            crno: DataTypes.STRING

        },
        {
            sequelize,
            modelName: "container_hold",
            underscored: true,
            freezeTableName: true,
            tableName: "container_hold",
            createdAt: false,
            updatedAt: false
        }
    );


    return container_hold;
};
