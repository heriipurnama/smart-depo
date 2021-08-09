"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class location extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			// container.belongsTo(models.container,
			// {
			// 	foreignKey: 'lccode',
			// })
		}
	}

	location.init(
		{
			lccode:{
                type: DataTypes.STRING,
                primaryKey: true
            },
            lcdesc: DataTypes.STRING
		},
		{
			sequelize,
			modelName: "location",
			underscored: true,
            freezeTableName: true,
            tableName: "tbllocation",
            createdAt: false,
            updatedAt: false

		}
	);

	Object.defineProperty(location.prototype, "entity", {
		get() {
			return {
                lccode: this.lccode,
				lcdesc: this.lcdesc
			};
		},
	});

	return location;
};
