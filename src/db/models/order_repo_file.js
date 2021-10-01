"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class order_repo_file extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate() {
			// define association here
		}
	}

	order_repo_file.init(
		{
			id:{
				type: DataTypes.STRING,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true
			},
			repoorderno: {
				type: DataTypes.STRING
			},
			url: DataTypes.STRING,
			file_time_upload: DataTypes.DATE

		},
		{
			sequelize,
			modelName: "orderRepoFile",
			underscored: true,
			freezeTableName: true,
			tableName: "order_repo_file",
			createdAt: false,
			updatedAt: false
		}
	);

	return order_repo_file;
};
