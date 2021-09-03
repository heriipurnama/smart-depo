"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class voyage extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			voyage.belongsTo(models.vessel,
				{
					foreignKey: "vesid",
				});
		}
	}

	voyage.init(
		{
			voyid:{
				type: DataTypes.BIGINT,
				primaryKey: true,
				autoIncrement: true
			},
			vesid: DataTypes.STRING,
			voyno: DataTypes.STRING,
			voypoo: DataTypes.STRING,
			voyeta: DataTypes.TIME,
			voyta: DataTypes.TIME,
			voyetberth: DataTypes.TIME,
			voytberth: DataTypes.TIME,
			voyetd: DataTypes.TIME,
			voytd: DataTypes.TIME,

		},
		{
			sequelize,
			modelName: "voyage",
			underscored: true,
			freezeTableName: true,
			tableName: "tblvoyage",
			createdAt: false,
			updatedAt: false
		}
	);

	Object.defineProperty(voyage.prototype, "entity", {
		get() {
			return {
				voyid: this.voyid,
				vesid: this.vesid,
				voyno: this.voyno,
				voypoo: this.voypoo,
				voyeta: this.voyeta,
				voyta: this.voyta,
				voyetberth: this.voyetberth,
				voytberth: this.voytberth,
				voyetd: this.voyetd,
				voytd: this.voytd,
			};
		},
	});

	return voyage;
};
