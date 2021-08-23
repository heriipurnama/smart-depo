"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class tblrepair_method extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}

	}
	tblrepair_method.init(
		{
			rmcode: {
				type: DataTypes.STRING,
				primaryKey: true,
				allowNull: true
			},
			rmdesc: DataTypes.STRING,
			rmclean: DataTypes.INTEGER,
		},
		{
			sequelize,
			tableName: "tblrepair_method",
			freezeTableName: true,
			modelName: "repairMethod",
			underscored: true,
			timestamps: false
		}
	);

	return tblrepair_method;
};
