"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class container extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			// container.hasOne(models.container_type,
			// {
			// 	foreignKey: 'ctcode',
			// });
			container.belongsTo(models.container_type,
				{
					foreignKey: "ctcode",
				});
		}
	}

	container.init(
		{
			cccode: DataTypes.STRING,
			ctcode: DataTypes.STRING,
			cclength: DataTypes.DECIMAL,
			ccheight: DataTypes.DECIMAL,
			created_at: DataTypes.DATE,
			created_by: DataTypes.NUMBER,
			updated_at: DataTypes.DATE,
			updated_by: DataTypes.NUMBER

		},
		{
			sequelize,
			modelName: "container",
			underscored: true,
		}
	);

	Object.defineProperty(container.prototype, "entity", {
		get() {
			return {
				cccode: this.cccode,
				ctcode: this.ctcode,
				cclength: this.cclength,
				ccheight: this.ccheight,
				created_at: this.created_at,
				created_by: this.created_by,
				updated_at: this.updated_at,
				updated_by: this.updated_by,
			};
		},
	});

	return container;
};