"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class container extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			container.belongsTo(models.container_process,
			{
				foreignKey: {
					name: "crcpid"
				}, as : "container_process"
			});
			container.belongsTo(models.container_code,
				{
					foreignKey: "cccode",
				});
		}
	}

	container.init(
		{
			crno:{
				type: DataTypes.STRING,
				primaryKey: true
			},
			mtcode: DataTypes.STRING,
			cccode: DataTypes.STRING,
			crowner: DataTypes.STRING,
			crcdp: DataTypes.INTEGER,
			crcsc: DataTypes.INTEGER,
			cracep: DataTypes.INTEGER,
			crmmyy: DataTypes.STRING,
			crweightk: DataTypes.DECIMAL,
			crweightl: DataTypes.DECIMAL,
			crtarak: DataTypes.DECIMAL,
			crtaral: DataTypes.DECIMAL,
			crnetk: DataTypes.DECIMAL,
			crnetl: DataTypes.DECIMAL,
			crvol: DataTypes.DECIMAL,
			crmanuf: DataTypes.STRING,
			crmandat: DataTypes.STRING,
			crpos: DataTypes.STRING,
			crbay: DataTypes.INTEGER,
			crrow: DataTypes.INTEGER,
			crtier: DataTypes.INTEGER,
			crlastacte: DataTypes.STRING,
			crlastconde: DataTypes.STRING,
			crlastact: DataTypes.STRING,
			crlastacto: DataTypes.STRING,
			crlastcond: DataTypes.STRING,
			crlastbxeng: DataTypes.STRING,
			crcpid: DataTypes.STRING,
			lastact: DataTypes.STRING

		},
		{
			sequelize,
			modelName: "container",
			underscored: true,
			freezeTableName: true,
			tableName: "tblcontainer",
			createdAt: false,
			updatedAt: false
		}
	);

	Object.defineProperty(container.prototype, "entity", {
		get() {
			return {
				crno: this.crno,
				mtcode: this.mtcode,
				cccode: this.cccode,
				crowner: this.crowner,
				crcdp: this.crcdp,
				crcsc: this.BOOLEAN,
				cracep: this.cracep,
				crmmyy: this.crmmyy,
				crweightk: this.crweightk,
				crweightl: this.crweightl,
				crtarak: this.crtarak,
				crtaral: this.crtaral,
				crnetk: this.crnetk,
				crnetl: this.crnetl,
				crvol: this.crvol,
				crmanuf: this.crmanuf,
				crmandat: this.crmandat,
				crpos: this.crpos,
				crbay: this.crbay,
				crrow: this.crrow,
				crtier: this.crtier,
				crlastacte: this.crlastacte,
				crlastconde: this.crlastconde,
				crlastact: this.crlastact,
				crlastacto: this.crlastacto,
				crlastcond: this.crlastcond,
				crlastbxeng: this.crlastbxeng,
				crcpid: this.crcpid,
				lastact: this.lastact
			};
		},
	});

	return container;
};
