"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class tblcurrency extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}

	}
	tblcurrency.init(
		{
			tucode: {
				type: DataTypes.STRING,
				primaryKey: true,
				allowNull: true
			},
			curr_name: DataTypes.STRING,
			curr_symbol: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "tblcurrency",
			freezeTableName: true,
			underscored: true,
			timestamps: false
		}
	);

	return tblcurrency;
};
