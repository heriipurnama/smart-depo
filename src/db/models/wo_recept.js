"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class wo_recept extends Model {
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

    wo_recept.init(
        {
            woreceptid:{
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            wonoid: DataTypes.INTEGER,
            woreceptdate: DataTypes.DATE,
            woreceptno: DataTypes.STRING,
            wocurr: DataTypes.STRING,
            worate: DataTypes.DECIMAL,
            wodescbiaya1: DataTypes.STRING,
            wobiaya1: DataTypes.DECIMAL,
            wodescbiaya2: DataTypes.STRING,
            wobiaya2: DataTypes.DECIMAL,
            wodescbiaya3: DataTypes.STRING,
            wobiaya3: DataTypes.DECIMAL,
            wodescbiaya4: DataTypes.STRING,
            wobiaya4: DataTypes.DECIMAL,
            wodescbiaya5: DataTypes.STRING,
            wobiaya5: DataTypes.DECIMAL,
            wodescbiaya6: DataTypes.STRING,
            wobiaya6: DataTypes.DECIMAL,
            wodescbiaya7: DataTypes.STRING,
            wobiaya7: DataTypes.DECIMAL,
            wobiaya_adm: DataTypes.DECIMAL,
            wototal_pajak: DataTypes.DECIMAL,
            womaterai: DataTypes.DECIMAL,
            wototal_tagihan: DataTypes.DECIMAL,
            wototbiaya_lain: DataTypes.DECIMAL,
            wototpph23: DataTypes.DECIMAL,

        },
        {
            sequelize,
            modelName: "wo_recept",
            underscored: true,
            freezeTableName: true,
            tableName: "wo_recept",
            createdAt: false,
            updatedAt: false
        }
    );

    return wo_recept;
};
