"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class group extends Model {
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

	group.init(
		{
			group_id:{
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true
			},
			group_name: DataTypes.STRING,
			description: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "group",
			underscored: true,
			freezeTableName: true,
			tableName: "tblgroups",
			createdAt: false,
			updatedAt: false

		}
	);

	Object.defineProperty(group.prototype, "entity", {
		get() {
			return {
				group_id: this.group_id,
				group_name: this.group_name,
				description: this.description,
			};
		},
	});

	return group;
};
