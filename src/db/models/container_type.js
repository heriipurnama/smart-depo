"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class container_type extends Model {
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

	container_type.init(
		{
			ctcode:{
				type: DataTypes.STRING,
				primaryKey: true
			},
			ctdesc: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "container_type",
			underscored: true,
			freezeTableName: true,
			tableName: "tblcontainer_type",
			createdAt: false,
			updatedAt: false
		}
	);

	Object.defineProperty(container_type.prototype, "entity", {
		get() {
			return {
				ctcode: this.ctcode,
				ctdesc: this.ctdesc,
			};
		},
	});

	return container_type;
};
