"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class tblrepo_tariffdetail extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}

	}
	tblrepo_tariffdetail.init(
		{
			prcode: {
				type: DataTypes.STRING,
				primaryKey: true,
				allowNull: false
			},
			rtno: DataTypes.STRING,
			rtid: DataTypes.INTEGER,
			rttype: DataTypes.INTEGER,
			
			rtfrom: DataTypes.STRING,
			rtto: DataTypes.STRING,
			rtlocurr: DataTypes.STRING,
			rtlon20: DataTypes.INTEGER,

			rtlon40: DataTypes.INTEGER,
			rtlon45: DataTypes.INTEGER,
			rtlof20: DataTypes.INTEGER,
			rtlof40: DataTypes.INTEGER,
			
			rtlof45: DataTypes.INTEGER,
			rtdoccurr: DataTypes.STRING,
			rtdocm: DataTypes.INTEGER,
			rtdocv: DataTypes.INTEGER,

			rthaulcurr: DataTypes.STRING,
			rthaulv20: DataTypes.INTEGER,
			rthaulv40: DataTypes.INTEGER,
			rthaulv45: DataTypes.INTEGER,

			rtpackcurr: DataTypes.STRING,
			rtpackv20: DataTypes.INTEGER,
			rtpackv40: DataTypes.INTEGER,
			rtpackv45: DataTypes.INTEGER,
			rtef: DataTypes.STRING
		},
		{
			sequelize,
			tableName: "tblrepo_tariffdetail",
			freezeTableName: true,
			modelName: "repoTariffDetail",
			underscored: true,
			timestamps: false
		}
	);

	return tblrepo_tariffdetail;
};
