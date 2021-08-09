"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class damage_type extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			// container.belongsTo(models.container,
			// {
			// 	foreignKey: 'ctcode',
			// })
		}
	}

	damage_type.init(
		{
			dycode: DataTypes.STRING,
            dydesc: DataTypes.STRING,
            dyclean: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "damage_type",
			underscored: true,
			freezeTableName: true,
			tableName: "tbldamage_type",

		}
	);

	Object.defineProperty(damage_type.prototype, "entity", {
		get() {
			return {
				dycode: this.dycode,
				dydesc: this.dydesc,
				dyclean: this.dyclean
			};
		},
	});

	return damage_type;
};
