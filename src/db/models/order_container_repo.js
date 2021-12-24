"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class order_container_repo extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate() {
			// define association here
		}
	}
	order_container_repo.init(
		{
			reorderno: {
				type: DataTypes.STRING,
				primaryKey: true,
				allowNull: false,
				autoIncrement: false,
			},
			redate: DataTypes.DATE,
			retype: DataTypes.INTEGER,
			retfrom: DataTypes.STRING,
			retto: DataTypes.STRING,
			replace1: DataTypes.STRING,
			readdr: DataTypes.STRING,
			recity: DataTypes.STRING,
			redline: DataTypes.DATE,
			rebilltype: DataTypes.INTEGER,
			relift: DataTypes.INTEGER,
			reclift: DataTypes.STRING,
			revlift: DataTypes.INTEGER,
			redoc: DataTypes.STRING,
			recdoc: DataTypes.STRING,
			revdoc: DataTypes.INTEGER,
			rechaul20: DataTypes.STRING,
			rechaultot20: DataTypes.STRING,
			rechaul40: DataTypes.STRING,
			rechaultot40: DataTypes.STRING,
			rechaul45: DataTypes.STRING,
			rechaultot45: DataTypes.STRING,
			subtotcur: DataTypes.STRING,
			re20: DataTypes.INTEGER,
			retot20: DataTypes.INTEGER,
			re40: DataTypes.INTEGER,
			retot40: DataTypes.INTEGER,
			re45: DataTypes.INTEGER,
			retot45: DataTypes.INTEGER,
			subtotbreak: DataTypes.INTEGER,
			subtotpack: DataTypes.INTEGER,
			totpack: DataTypes.INTEGER,
			totbreak: DataTypes.INTEGER,
			subtotcurbreak: DataTypes.STRING,
			subtotcurpack: DataTypes.STRING,
			subtotcurcharge1: DataTypes.STRING,
			subtotcurcharge2: DataTypes.STRING,
			totcurall: DataTypes.STRING,
			recpack20: DataTypes.STRING,
			recpacktot20: DataTypes.STRING,
			recpack40: DataTypes.STRING,
			recpacktot40: DataTypes.STRING,
			recpack45: DataTypes.STRING,
			recpacktot45: DataTypes.STRING,
			revpack20: DataTypes.INTEGER,
			revpacktot20: DataTypes.INTEGER,
			revpack40: DataTypes.INTEGER,
			revpacktot40: DataTypes.INTEGER,
			revpack45: DataTypes.INTEGER,
			revpacktot45: DataTypes.INTEGER,
			reappv: DataTypes.INTEGER,
			reother1: DataTypes.INTEGER,
			reother2: DataTypes.INTEGER,
			reautno: DataTypes.STRING,
			rebill: DataTypes.STRING,
			reismtcon: DataTypes.INTEGER,
			reischarged: DataTypes.INTEGER,
			recrtby: DataTypes.STRING,
			recrton: DataTypes.DATE,
			remdfby: DataTypes.STRING,
			remdfon: DataTypes.DATE,
			cpopr: DataTypes.STRING,
			cpcust: DataTypes.STRING,
		},
		{
			sequelize,
			tableName: "order_container_repo",
			freezeTableName: true,
			modelName: "orderContainerRepo",
			underscored: true,
			timestamps: false,
		}
	);

	return order_container_repo;
};
