"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class message extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	message.init(
		{
			id_sender: DataTypes.INTEGER,
			id_receiver: DataTypes.INTEGER,
			message: DataTypes.TEXT,
			delete_at: DataTypes.DATE,
		},
		{
			sequelize,
			modelName: "message",
			underscored: true,
		}
	);
	return message;
};
