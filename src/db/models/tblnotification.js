"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class tblnotification extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}

	}
	tblnotification.init(
		{
			notification_id: {
				type: DataTypes.STRING,
				primaryKey: true,
				allowNull: true,
				autoIncrement: true
			},
			module: DataTypes.STRING,
			message: DataTypes.STRING,
			is_read: DataTypes.INTEGER,
			created_by: DataTypes.STRING,
			created_date: DataTypes.DATE
		},
		{
			sequelize,
			tableName: "tblnotification",
			freezeTableName: true,
			modelName: "notification",
			underscored: true,
			timestamps: false
		}
	);

	return tblnotification;
};
