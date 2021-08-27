"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class tbldebitur extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}

	}
	tbldebitur.init(
		{
			cucode: {
				type: DataTypes.STRING,
				primaryKey: true,
				allowNull: true
			},
			cncode: DataTypes.STRING,
			cuname: DataTypes.STRING,
			cuaddr: DataTypes.STRING,
			cuzip: DataTypes.STRING,
			cuphone: DataTypes.STRING,
			cufax: DataTypes.STRING,
			cucontact: DataTypes.STRING,
			cuemail: DataTypes.STRING,
			cunpwp: DataTypes.STRING,
			cuskada: DataTypes.STRING,
			cudebtur: DataTypes.STRING,
			cutype: DataTypes.STRING,
			cunppkp: DataTypes.INTEGER
		},
		{
			sequelize,
			tableName: "tbldebitur",
			freezeTableName: true,
			modelName: "debitur",
			underscored: true,
			timestamps: false
		}
	);

	return tbldebitur;
};
