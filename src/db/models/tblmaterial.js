"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class tblmaterial extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}

	}
	tblmaterial.init(
		{
			mtcode: {
				type: DataTypes.STRING,
				primaryKey: true,
				allowNull: true
			},
			mtdesc: DataTypes.STRING
		},
		{
			sequelize,
			tableName: "tblmaterial",
			freezeTableName: true,
			modelName: "material",
			underscored: true,
			timestamps: false
		}
	);

	return tblmaterial;
};
