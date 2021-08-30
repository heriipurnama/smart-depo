"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class param extends Model {
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

	param.init(
		{
			id:{
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true
			},
			param_id: DataTypes.STRING,
			tabs: DataTypes.STRING,
			description: DataTypes.STRING,
			param: DataTypes.STRING
		},
		{
			sequelize,
			modelName: "param",
			underscored: true,
			freezeTableName: true,
			tableName: "tblparam",
			createdAt: false,
			updatedAt: false

		}
	);

	Object.defineProperty(param.prototype, "entity", {
		get() {
			return {
				param_id: this.param_id,
				tabs: this.tabs,
				description: this.description,
				param: this.param
			};
		},
	});

	return param;
};
