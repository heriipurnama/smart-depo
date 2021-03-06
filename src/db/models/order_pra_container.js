"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class order_pra_container extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate() {
			// define association here
		}
	}
	order_pra_container.init(
		{
			pracrnoid: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true,
			},
			praid: DataTypes.INTEGER,
			crno: DataTypes.STRING,
			cccode: DataTypes.STRING,

			ctcode: DataTypes.STRING,
			cclength: DataTypes.INTEGER,
			ccheight: DataTypes.INTEGER,
			cpife: DataTypes.STRING,

			cpishold: DataTypes.INTEGER,
			cpiremark: DataTypes.STRING,
			cpigatedate: DataTypes.DATE,
			cpiflag: DataTypes.INTEGER,

			cpopr: DataTypes.STRING,
			cpcust: DataTypes.STRING,
			biaya_lolo: DataTypes.INTEGER,
			biaya_clean: DataTypes.INTEGER,

			cleaning_type: DataTypes.STRING,
			deposit: DataTypes.INTEGER,
			biaya_lain: DataTypes.DECIMAL,
			pph23: DataTypes.DECIMAL,
			sealno: DataTypes.STRING,
		},
		{
			sequelize,
			tableName: "order_pra_container",
			freezeTableName: true,
			modelName: "orderPraContainer",
			underscored: true,
			timestamps: false,
		}
	);

	return order_pra_container;
};
