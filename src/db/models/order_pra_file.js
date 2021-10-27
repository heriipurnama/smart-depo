"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class order_pra_file extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate() {
			// define association here
		}
	}

	order_pra_file.init(
		{
			id: {
				type: DataTypes.STRING,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true,
			},
			cpiorderno: {
				type: DataTypes.STRING,
			},
			url: DataTypes.STRING,
			file_time_upload: DataTypes.DATE,
			flag: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "orderPraFile",
			underscored: true,
			freezeTableName: true,
			tableName: "order_pra_file",
			createdAt: false,
			updatedAt: false,
		}
	);

	return order_pra_file;
};
