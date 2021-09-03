"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class company extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			// company.belongsTo(models.container_code,
			// {
			//     foreignKey: "cmcode",
			// });
		}
	}

	company.init(
		{
			dpcode:{
				type: DataTypes.STRING,
				primaryKey: true,
			},
			sdcode: DataTypes.STRING,
			pamgr: DataTypes.STRING,
			pajab: DataTypes.STRING,
			pagroup: DataTypes.STRING,
			papers: DataTypes.STRING,
			paaddr1: DataTypes.STRING,
			paaddr: DataTypes.STRING,
			paaddr2: DataTypes.STRING,
			paaddr3: DataTypes.STRING,
			paphone: DataTypes.STRING,
			pafax: DataTypes.STRING,
			patelex: DataTypes.STRING,
			pamancost: DataTypes.STRING,
			pajabcost: DataTypes.STRING,
			pamankeu: DataTypes.STRING,
			pajabkeu: DataTypes.STRING,
			padest: DataTypes.STRING,
			pareport: DataTypes.STRING,
			papic: DataTypes.STRING,
			paport: DataTypes.STRING,
			pachklong: DataTypes.INTEGER,
			pafileupload: DataTypes.STRING,
			palastupload: DataTypes.DATE,
			pafiledownload: DataTypes.STRING,
			palastdownload: DataTypes.DATE,
			pasecgate: DataTypes.INTEGER,
			pakwtgate: DataTypes.INTEGER,
			pakwtspv: DataTypes.STRING,
			pakwtnpwp: DataTypes.STRING,
			pakwtpkp: DataTypes.DATE,
			pakwtadm: DataTypes.STRING,
			pakwtppn: DataTypes.STRING,
			pakwtnum: DataTypes.STRING,
			pakwtmax: DataTypes.STRING,
			pakwtsed: DataTypes.STRING,
			pakwtstan: DataTypes.STRING,
			pakwtsednum: DataTypes.STRING,
			pakwtsedmax: DataTypes.STRING,
			pakwtstannum: DataTypes.STRING,
			pakwtstanmax: DataTypes.STRING

		},
		{
			sequelize,
			modelName: "company",
			underscored: true,
			freezeTableName: true,
			tableName: "tblcompany",
			createdAt: false,
			updatedAt: false
		}
	);

	Object.defineProperty(company.prototype, "entity", {
		get() {
			return {
				dpcode: this.dpcode,
				sdcode: this.sdcode,
				pamgr: this.pamgr,
				pajab: this.pajab,
				pagroup: this.pagroup,
				papers: this.papers,
				paaddr1: this.paaddr1,
				paaddr: this.paaddr,
				paaddr2: this.paaddr2,
				paaddr3: this.paaddr3,
				paphone: this.paphone,
				pafax: this.pafax,
				patelex: this.patelex,
				pamancost: this.pamancost,
				pajabcost: this.pajabcost,
				pamankeu: this.pamankeu,
				pajabkeu: this.pajabkeu,
				padest: this.padest,
				pareport: this.pareport,
				papic: this.papic,
				paport: this.paport,
				pachklong: this.pachklong,
				pafileupload: this.pafileupload,
				palastupload: this.palastupload,
				pafiledownload: this.pafiledownload,
				palastdownload: this.palastdownload,
				pasecgate: this.pasecgate,
				pakwtgate: this.pakwtgate,
				pakwtspv: this.pakwtspv,
				pakwtnpwp: this.pakwtnpwp,
				pakwtpkp: this.pakwtpkp,
				pakwtadm: this.pakwtadm,
				pakwtppn: this.pakwtppn,
				pakwtnum: this.pakwtnum,
				pakwtmax: this.pakwtmax,
				pakwtsed: this.pakwtsed,
				pakwtstan: this.pakwtstan,
				pakwtsednum: this.pakwtsednum,
				pakwtsedmax: this.pakwtsedmax,
				pakwtstannum: this.pakwtstannum,
				pakwtstanmax: this.pakwtstanmax
			};
		},
	});

	return company;
};
