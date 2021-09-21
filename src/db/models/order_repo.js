"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class order_repo extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			order_repo.belongsTo(models.voyage,
				{
					foreignKey: {
						name: "repovoyid"
					}, as : "voyages"
				});
			order_repo.hasMany(models.orderRepoContainer,
				{
					foreignKey: {
						name: "repoid"
					}, as : "orderRepoContainers"
				});
			order_repo.belongsTo(models.vessel,
				{
					foreignKey: {
						name: "repoves"
					}, as : "vessels"
				});
				
		}

	}
	order_repo.init(
		{
			repoid: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true
			},
			repoorderno: DataTypes.STRING,
			cpopr: DataTypes.STRING,
			cpcust: DataTypes.STRING,

			repodish: DataTypes.STRING,
			repodisdat: DataTypes.DATE,
			liftoncharge: DataTypes.INTEGER,
			cpdepo: DataTypes.STRING,
			
			repopratgl: DataTypes.DATE,
			reporefin: DataTypes.STRING,
			repojam: DataTypes.STRING,
			repovoyid: DataTypes.INTEGER,

			repoves: DataTypes.STRING,
			repocargo: DataTypes.STRING,
			repodeliver: DataTypes.STRING,
			repolunas: DataTypes.STRING,
		},
		{
			sequelize,
			tableName: "order_repo",
			freezeTableName: true,
			modelName: "orderRepo",
			underscored: true,
			timestamps: false
		}
	);

	return order_repo;
};
