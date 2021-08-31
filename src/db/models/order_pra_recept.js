"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class order_pra_recept extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}

	}
	order_pra_recept.init(
		{
			prareceptid: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true
			},
			praid: DataTypes.INTEGER,
			cpireceptno: DataTypes.STRING,
			cpicurr: DataTypes.STRING,

			cpirate: DataTypes.INTEGER
		},
		{
			sequelize,
			tableName: "order_pra_recept",
			freezeTableName: true,
			modelName: "orderPraRecept",
			underscored: true,
			timestamps: false
		}
	);

	return order_pra_recept;
};
