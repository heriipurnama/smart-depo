"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class component extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			// component.belongsTo(models.container_code,
			// {
			//     foreignKey: "cmcode",
			// });
		}
	}

	component.init(
		{
			cmcode:{
				type: DataTypes.STRING,
				primaryKey: true,
			},
			cmdesc: DataTypes.STRING,
			cmcode_ssl_ext: DataTypes.STRING

		},
		{
			sequelize,
			modelName: "component",
			underscored: true,
			freezeTableName: true,
			tableName: "tblcomponent",
			createdAt: false,
			updatedAt: false
		}
	);

	Object.defineProperty(component.prototype, "entity", {
		get() {
			return {
				cmcode: this.cmcode,
				cmdesc: this.cmdesc,
				cmcode_ssl_ext: this.cmcode_ssl_ext
			};
		},
	});

	return component;
};
