"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class tbldamage_tariffdetail extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}

	tbldamage_tariffdetail.init(
		{
			prcode:{
				type: DataTypes.STRING,
				primaryKey: true,
				allowNull: false
			},
			dmno: DataTypes.STRING,
			dmid: DataTypes.INTEGER,
			dycode: DataTypes.STRING,

			cmcode: DataTypes.STRING,
			rmcode: DataTypes.STRING,
			dmlccode1: DataTypes.STRING,
			dmlccode2: DataTypes.STRING,

			dmlccode3: DataTypes.STRING,
			dmlccode4: DataTypes.STRING,
			dmcalmtd1: DataTypes.STRING,
			dmcurr: DataTypes.STRING,

			dmdesc: DataTypes.STRING,
			muname: DataTypes.STRING,
			dmeachcrt: DataTypes.INTEGER,
			dmeachmhr: DataTypes.INTEGER,
			
			dmeachmat: DataTypes.STRING,
			dm1stcrt: DataTypes.INTEGER,
			dm1stmhr: DataTypes.INTEGER,
			dm1stmat: DataTypes.INTEGER,

			dmaddcrt: DataTypes.INTEGER,
			dmaddmhr: DataTypes.INTEGER,
			dmaddmat: DataTypes.INTEGER,
			dmran1crt: DataTypes.INTEGER,

			dmran1mhr: DataTypes.INTEGER,
			dmran1mat: DataTypes.INTEGER,
			dmran2crt: DataTypes.INTEGER,
			dmran2mhr: DataTypes.INTEGER,

			dmran2mat: DataTypes.INTEGER,
			dmran3crt: DataTypes.INTEGER,
			dmran3mhr: DataTypes.INTEGER,
			dmran3mat: DataTypes.INTEGER,

			dmran4crt: DataTypes.INTEGER,
			dmran4mhr: DataTypes.INTEGER,
			dmran4mat: DataTypes.INTEGER,
			dm20crt: DataTypes.INTEGER,

			dm20mhr: DataTypes.INTEGER,
			dm20mat: DataTypes.INTEGER,
			dm40crt: DataTypes.INTEGER,
			dm40mhr: DataTypes.INTEGER,

			dm40mat: DataTypes.INTEGER,
			dmmax: DataTypes.INTEGER,
			dmnotes: DataTypes.STRING
		},
		{
			sequelize,
			modelName: "damageTariffDetail",
			freezeTableName: true,
			tableName: "tbldamage_tariffdetail",
			createdAt: false,
			updatedAt: false
		}
	);

	return tbldamage_tariffdetail;
};
