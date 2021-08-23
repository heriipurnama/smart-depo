"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class tbldepo extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}

	}
	tbldepo.init(
		{
			dpcode: {
				type: DataTypes.STRING,
				primaryKey: true,
				allowNull: true
			},
			dpname: DataTypes.STRING
		},
		{
			sequelize,
			tableName: "tbldepo",
			freezeTableName: true,
			modelName: "depo",
			underscored: true,
			timestamps: false
		}
	);

	return tbldepo;
};
