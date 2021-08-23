"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class tbllogactivity extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}

	}
	tbllogactivity.init(
		{
			logid: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true,
			},
			timestamp_date: DataTypes.DATE,
			username: DataTypes.STRING,
			action: DataTypes.STRING,
			note: DataTypes.STRING,
			ip: DataTypes.STRING,
		},
		{
			sequelize,
			tableName: "tbllogactivity",
			freezeTableName: true,
			modelName: "logActivity",
			underscored: true,
			timestamps: false
		}
	);

	return tbllogactivity;
};
