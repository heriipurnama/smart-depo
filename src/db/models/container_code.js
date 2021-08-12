"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class container_code extends Model {
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
			container_code.belongsTo(models.container_type,
				{
					foreignKey: "ctcode",
				});
		}
	}

	container_code.init(
		{
			cccode: DataTypes.STRING,
      ctcode: DataTypes.STRING,
      cclength: DataTypes.DECIMAL,
			ccheight: DataTypes.DECIMAL,
			ccalias1: DataTypes.STRING,
			ccalias2: DataTypes.STRING,
      created_at: DataTypes.DATE,
      created_by: DataTypes.NUMBER,
      updated_at: DataTypes.DATE,
      updated_by: DataTypes.NUMBER

		},
		{
			sequelize,
			modelName: "container_code",
			underscored: true,
			freezeTableName: true,
            tableName: "tblcontainer_code",
		}
	);

	Object.defineProperty(container_code.prototype, "entity", {
		get() {
			return {
				cccode: this.cccode,
        ctcode: this.ctcode,
        cclength: this.cclength,
				ccheight: this.ccheight,
				ccalias1: this.ccalias1,
				ccalias2: this.ccalias2,
        created_at: this.created_at,
        created_by: this.created_by,
        updated_at: this.updated_at,
        updated_by: this.updated_by
			};
		},
	});

	return container_code;
};
