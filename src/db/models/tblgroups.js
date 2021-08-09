"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class tblgroups extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}

	}
	tblgroups.init(
		{
			group_id:{
				type: DataTypes.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true,
			},
			group_name: DataTypes.STRING,
			description: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "tblgroups",
			underscored: true,
			timestamps: false
		}
	);

	return tblgroups;
};
