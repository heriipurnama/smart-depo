"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class tbldamage_tariff extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}

	}
	tbldamage_tariff.init(
		{
			prcode: {
				type: DataTypes.STRING,
				primaryKey: true,
				allowNull: true
			},
			dmno: DataTypes.STRING,
			dmdate: DataTypes.DATE,
			dmexpdate: DataTypes.DATE,
			dmremarks: DataTypes.STRING
		},
		{
			sequelize,
			tableName: "tbldamage_tariff",
			freezeTableName: true,
			modelName: "damageTariff",
			underscored: true,
			timestamps: false
		}
	);

	return tbldamage_tariff;
};
