"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class city extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			city.belongsTo(models.country,
				{
					foreignKey: "cncode",
				});
		}
	}

	city.init(
		{
			city_id:{
				type: DataTypes.STRING,
				primaryKey: true,
				autoIncrement: true
			},
			city_name: DataTypes.STRING,
			cncode: DataTypes.STRING

		},
		{
			sequelize,
			modelName: "city",
			underscored: true,
			freezeTableName: true,
			tableName: "tblcity",
			createdAt: false,
			updatedAt: false
		}
	);

	Object.defineProperty(city.prototype, "entity", {
		get() {
			return {
				city_id: this.city_id,
				city_name: this.city_name,
				cncode: this.cncode
			};
		},
	});

	return city;
};
