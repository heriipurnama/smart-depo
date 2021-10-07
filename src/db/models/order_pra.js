"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class order_pra extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			order_pra.belongsTo(models.voyage,
				{
					foreignKey: {
						name: "cpivoyid"
					}, as : "voyages"
				});
			order_pra.hasMany(models.orderPraContainer,
				{
					foreignKey: {
						name: "praid"
					}, as : "orderPraContainers"
				});
			order_pra.belongsTo(models.tblusers,
				{	
					foreignKey: {
						name: "crtby"
					},
					as : "users"
				});
			order_pra.belongsTo(models.vessel,
				{
					foreignKey: {
						name: "cpives"
					}, as : "vessels"
				});
			order_pra.hasMany(models.orderPraFile,
				{
					foreignKey: {
						name: "cpiorderno"
					}, 
					sourceKey : "cpiorderno",
					as : "files"
				});
		}

	}
	order_pra.init(
		{
			praid: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true
			},
			cpiorderno: DataTypes.STRING,
			cpopr: DataTypes.STRING,
			cpcust: DataTypes.STRING,

			cpidish: DataTypes.STRING,
			cpidisdat: DataTypes.DATE,
			liftoffcharge: DataTypes.INTEGER,
			cpdepo: DataTypes.STRING,
			
			cpipratgl: DataTypes.DATE,
			cpirefin: DataTypes.STRING,
			cpijam: DataTypes.STRING,
			cpivoyid: DataTypes.INTEGER,

			cpives: DataTypes.STRING,
			cpicargo: DataTypes.STRING,
			cpideliver: DataTypes.STRING,
			cpilunas: DataTypes.STRING,

			appv: DataTypes.INTEGER,
			checkbill: DataTypes.INTEGER,
			totalcharge: DataTypes.DECIMAL,
			crtby: DataTypes.INTEGER,

			crton: DataTypes.DATE,
			mdfby: DataTypes.INTEGER,
			mdfon: DataTypes.DATE
		},
		{
			sequelize,
			tableName: "order_pra",
			freezeTableName: true,
			modelName: "orderPra",
			underscored: true,
			timestamps: false
		}
	);

	return order_pra;
};
