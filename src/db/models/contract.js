"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class contract extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate() {
			// define association here
			// contract.belongsTo(models.container_code,
			// {
			//     foreignKey: "cmcode",
			// });
		}
	}

	contract.init(
		{
			prcode: {
				type: DataTypes.STRING,
				primaryKey: true,
			},
			cono: DataTypes.STRING,
			codate: DataTypes.DATE,
			coexpdate: DataTypes.DATE,
			covcurr: DataTypes.STRING,
			covapp: DataTypes.DECIMAL,
			cov1: DataTypes.DECIMAL,
			covd1: DataTypes.INTEGER,
			cov2: DataTypes.DECIMAL,
			covd2: DataTypes.INTEGER,
			cov3: DataTypes.DECIMAL,
			covd3: DataTypes.INTEGER,
			costrcurr: DataTypes.STRING,
			costrv20: DataTypes.DECIMAL,
			costrv40: DataTypes.DECIMAL,
			costrv45: DataTypes.DECIMAL,
			cofree: DataTypes.INTEGER,
			colomtycurr: DataTypes.STRING,
			colonmty20: DataTypes.DECIMAL,
			colonmty40: DataTypes.DECIMAL,
			colonmty45: DataTypes.DECIMAL,
			colofmty20: DataTypes.DECIMAL,
			colofmty40: DataTypes.DECIMAL,
			colofmty45: DataTypes.DECIMAL,
			colocycurr: DataTypes.STRING,
			coloncy20: DataTypes.DECIMAL,
			coloncy40: DataTypes.DECIMAL,
			coloncy45: DataTypes.DECIMAL,
			colofcy20: DataTypes.DECIMAL,
			colofcy40: DataTypes.DECIMAL,
			colofcy45: DataTypes.DECIMAL,
			colabrtcurr: DataTypes.STRING,
			colabrtb: DataTypes.DECIMAL,
			colabrtbr: DataTypes.DECIMAL,
			colabrte: DataTypes.DECIMAL,
			colabrtc: DataTypes.DECIMAL,
			cowwcycurr: DataTypes.STRING,
			cowwcy20: DataTypes.DECIMAL,
			cowwcy40: DataTypes.DECIMAL,
			cowwcy45: DataTypes.DECIMAL,
			cowwmtycurr: DataTypes.STRING,
			cowwmty20: DataTypes.DECIMAL,
			cowwmty40: DataTypes.DECIMAL,
			cowwmty45: DataTypes.DECIMAL,
			cosccycurr: DataTypes.STRING,
			cosccy20: DataTypes.DECIMAL,
			cosccy40: DataTypes.DECIMAL,
			cosccy45: DataTypes.DECIMAL,
			coscmtycurr: DataTypes.STRING,
			coscmty20: DataTypes.DECIMAL,
			coscmty40: DataTypes.DECIMAL,
			coscmty45: DataTypes.DECIMAL,
			combcycurr: DataTypes.STRING,
			combcy20: DataTypes.DECIMAL,
			combcy40: DataTypes.DECIMAL,
			combcy45: DataTypes.DECIMAL,
			combmtycurr: DataTypes.STRING,
			combmty20: DataTypes.DECIMAL,
			combmty40: DataTypes.DECIMAL,
			combmty45: DataTypes.DECIMAL,
			cordcycurr: DataTypes.STRING,
			cordcy20: DataTypes.DECIMAL,
			cordcy40: DataTypes.DECIMAL,
			cordcy45: DataTypes.DECIMAL,
			cordmtycurr: DataTypes.STRING,
			cordmty20: DataTypes.DECIMAL,
			cordmty40: DataTypes.DECIMAL,
			cordmty45: DataTypes.DECIMAL,
			commcycurr: DataTypes.STRING,
			commcy20: DataTypes.DECIMAL,
			commcy40: DataTypes.DECIMAL,
			commcy45: DataTypes.DECIMAL,
			commmtycurr: DataTypes.STRING,
			commmty20: DataTypes.DECIMAL,
			commmty40: DataTypes.DECIMAL,
			commmty45: DataTypes.DECIMAL,
			cocccycurr: DataTypes.STRING,
			cocccy20: DataTypes.DECIMAL,
			cocccy40: DataTypes.DECIMAL,
			cocccy45: DataTypes.DECIMAL,
			coccmtycurr: DataTypes.STRING,
			coccmty20: DataTypes.DECIMAL,
			coccmty40: DataTypes.DECIMAL,
			coccmty45: DataTypes.DECIMAL,
			cowpcycurr: DataTypes.STRING,
			cowpcy20: DataTypes.DECIMAL,
			cowpcy40: DataTypes.DECIMAL,
			cowpcy45: DataTypes.DECIMAL,
			cowpmtycurr: DataTypes.INTEGER,
			cowpmty20: DataTypes.DECIMAL,
			cowpmty40: DataTypes.DECIMAL,
			cowpmty45: DataTypes.DECIMAL,
			cofreedn: DataTypes.INTEGER,
			colabrtr: DataTypes.DECIMAL,
			cofreedmg: DataTypes.INTEGER,
			coadmm: DataTypes.INTEGER,
			coadmcurr: DataTypes.STRING,
			coadmv: DataTypes.DECIMAL,
			cotax: DataTypes.DECIMAL,
			comaterai: DataTypes.DECIMAL,
			deposit: DataTypes.DECIMAL
		},
		{
			sequelize,
			modelName: "contract",
			underscored: true,
			freezeTableName: true,
			tableName: "tblcontract",
			createdAt: false,
			updatedAt: false,
		}
	);

	Object.defineProperty(contract.prototype, "entity", {
		get() {
			return {
				prcode: this.prcode,
				cono: this.cono,
				codate: this.codate,
				coexpdate: this.coexpdate,
				covcurr: this.covcurr,
				covapp: this.covapp,
				cov1: this.cov1,
				covd1: this.covd1,
				cov2: this.cov2,
				covd2: this.covd2,
				cov3: this.cov3,
				covd3: this.covd3,
				costrcurr: this.costrcurr,
				costrv20: this.costrv20,
				costrv40: this.costrv40,
				costrv45: this.costrv45,
				cofree: this.cofree,
				colomtycurr: this.colomtycurr,
				colonmty20: this.colonmty20,
				colonmty40: this.colonmty40,
				colonmty45: this.colonmty45,
				colofmty20: this.colofmty20,
				colofmty40: this.colofmty40,
				colofmty45: this.colofmty45,
				colocycurr: this.colocycurr,
				coloncy20: this.coloncy20,
				coloncy40: this.coloncy40,
				coloncy45: this.coloncy45,
				colofcy20: this.colofcy20,
				colofcy40: this.colofcy40,
				colofcy45: this.colofcy45,
				colabrtcurr: this.colabrtcurr,
				colabrtb: this.colabrtb,
				colabrtbr: this.colabrtbr,
				colabrte: this.colabrte,
				colabrtc: this.colabrtc,
				cowwcycurr: this.cowwcycurr,
				cowwcy20: this.cowwcy20,
				cowwcy40: this.cowwcy40,
				cowwcy45: this.cowwcy45,
				cowwmtycurr: this.cowwmtycurr,
				cowwmty20: this.cowwmty20,
				cowwmty40: this.cowwmty40,
				cowwmty45: this.cowwmty45,
				cosccycurr: this.cosccycurr,
				cosccy20: this.cosccy20,
				cosccy40: this.cosccy40,
				cosccy45: this.cosccy45,
				coscmtycurr: this.coscmtycurr,
				coscmty20: this.coscmty20,
				coscmty40: this.coscmty40,
				coscmty45: this.coscmty45,
				combcycurr: this.combcycurr,
				combcy20: this.combcy20,
				combmtycurr: this.combmtycurr,
				combmty20: this.combmty20,
				combmty40: this.combmty40,
				combmty45: this.combmty45,
				cordcycurr: this.cordcycurr,
				cordcy20: this.cordcy20,
				cordcy40: this.cordcy40,
				cordcy45: this.cordcy45,
				cordmtycurr: this.cordmtycurr,
				cordmty20: this.cordmty20,
				cordmty40: this.cordmty40,
				cordmty45: this.cordmty45,
				dpcode: this.dpcode,
				commcycurr: this.commcycurr,
				commcy20: this.commcy20,
				commcy40: this.commcy40,
				commcy45: this.commcy45,
				commmtycurr: this.commmtycurr,
				commmty20: this.commmty20,
				commmty40: this.commmty40,
				commmty45: this.commmty45,
				cocccycurr: this.cocccycurr,
				cocccy20: this.cocccy20,
				cocccy40: this.cocccy40,
				cocccy45: this.cocccy45,
				coccmtycurr: this.coccmtycurr,
				coccmty20: this.coccmty20,
				coccmty40: this.coccmty40,
				coccmty45: this.coccmty45,
				cowpcycurr: this.cowpcycurr,
				cowpcy20: this.cowpcy20,
				cowpcy40: this.cowpcy40,
				cowpcy45: this.cowpcy45,
				cowpmtycurr: this.cowpmtycurr,
				cowpmty20: this.cowpmty20,
				cowpmty40: this.cowpmty40,
				cowpmty45: this.cowpmty45,
				cofreedn: this.cofreedn,
				colabrtr: this.colabrtr,
				cofreedmg: this.cofreedmg,
				coadmm: this.coadmm,
				coadmcurr: this.coadmcurr,
				coadmv: this.coadmv,
				comaterai: this.comaterai,
				deposit: this.deposit
			};
		},
	});

	return contract;
};
