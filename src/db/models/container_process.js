"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class container_process extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate() {
			// define association here
			// container.belongsTo(models.container,
			// {
			// 	foreignKey: 'ctcode',
			// })
		}
	}

	container_process.init(
		{
			cpid: {
				type: DataTypes.STRING,
				primaryKey: true,
			},
			crno: DataTypes.STRING,
			cpdepo: DataTypes.STRING,
			spdepo: DataTypes.STRING,

			cpcust: DataTypes.STRING,
			cpcust1: DataTypes.STRING,
			cpopr: DataTypes.STRING,
			cpopr1: DataTypes.STRING,

			cpichrgbb: DataTypes.INTEGER,
			cpipaidbb: DataTypes.INTEGER,
			cpicurr: DataTypes.STRING,
			cpirate: DataTypes.DECIMAL,

			cpivbb: DataTypes.DECIMAL,
			cpilofopr: DataTypes.STRING,
			cpiinterdate: DataTypes.DATE,
			cpiinterno: DataTypes.STRING,

			cpiorderno: DataTypes.STRING,
			cpiprano: DataTypes.STRING,
			cpireceptno: DataTypes.STRING,
			cpipratgl: DataTypes.DATE,
			cpitgl: DataTypes.DATE,

			onhiredate: DataTypes.DATE,
			offhiredate: DataTypes.DATE,
			manufdate: DataTypes.STRING,
			cpilocon: DataTypes.STRING,

			cpolocon: DataTypes.STRING,
			cpijam: DataTypes.STRING,
			cpistatus: DataTypes.STRING,
			cpideliver: DataTypes.STRING,

			cpidisdat: DataTypes.DATE,
			cpidish: DataTypes.STRING,
			cpidishjam: DataTypes.STRING,
			cpieir: DataTypes.INTEGER,

			cpiterm: DataTypes.STRING,
			cpife: DataTypes.STRING,
			cpicargo: DataTypes.STRING,
			cpiprin: DataTypes.STRING,

			cpidpp: DataTypes.DECIMAL,
			cpidppinout: DataTypes.INTEGER,
			cpiseal: DataTypes.STRING,
			cpives: DataTypes.STRING,

			cpitruck: DataTypes.STRING,
			cpinopol: DataTypes.STRING,
			cpishold: DataTypes.INTEGER,
			cpiremark: DataTypes.STRING,

			cpiremark1: DataTypes.STRING,
			cpiflgprt: DataTypes.STRING,
			cpirefin: DataTypes.STRING,
			cpicrton: DataTypes.DATE,

			cpicrtby: DataTypes.STRING,
			cpimdfon: DataTypes.DATE,
			cpimdfby: DataTypes.STRING,
			cpochrgbm: DataTypes.INTEGER,

			cpopaidbm: DataTypes.INTEGER,
			cpocurr: DataTypes.STRING,
			cporate: DataTypes.DECIMAL,
			cpovbm: DataTypes.DECIMAL,

			cpolonopr: DataTypes.STRING,
			cpoorderno: DataTypes.STRING,
			cpoprano: DataTypes.STRING,
			cporeceptno: DataTypes.STRING,

			cpopratgl: DataTypes.DATE,
			cpotgl: DataTypes.DATE,
			cpojam: DataTypes.STRING,
			cpostatus: DataTypes.STRING,

			cporeceiv: DataTypes.STRING,
			cpoload: DataTypes.STRING,
			cpoloaddat: DataTypes.DATE,
			cpoloadjam: DataTypes.STRING,

			cpoterm: DataTypes.STRING,
			cpofe: DataTypes.STRING,
			cpocargo: DataTypes.STRING,
			cpoprin: DataTypes.STRING,

			cpodpp: DataTypes.DECIMAL,
			cpodppinout: DataTypes.INTEGER,
			cposeal: DataTypes.STRING,
			cpoves: DataTypes.STRING,

			cpotruck: DataTypes.STRING,
			cponopol: DataTypes.STRING,
			cporemark: DataTypes.STRING,
			cpoflgprt: DataTypes.STRING,

			cpoeir: DataTypes.INTEGER,
			cporefout: DataTypes.STRING,
			cpocrton: DataTypes.DATE,
			cpocrtby: DataTypes.STRING,

			cpomdfon: DataTypes.DATE,
			cpomdfby: DataTypes.STRING,
			cpivoy: DataTypes.STRING,
			cpovoy: DataTypes.STRING,

			cpiceir: DataTypes.STRING,
			cpoceir: DataTypes.STRING,
			cpholdon: DataTypes.DATE,
			cpholdby: DataTypes.STRING,

			cpreleaseon: DataTypes.DATE,
			cpreleaby: DataTypes.STRING,
			dpcode: DataTypes.STRING,
			sdcode: DataTypes.STRING,

			cpidriver: DataTypes.STRING,
			cpodriver: DataTypes.STRING,
			cpivoyid: DataTypes.STRING,
			cpovoyid: DataTypes.STRING,

			cpodesti: DataTypes.STRING,
			cpinotes: DataTypes.STRING,
			cponotes: DataTypes.STRING,
			svsurdat: DataTypes.DATE,

			syid: DataTypes.STRING,
			liftoncharge: DataTypes.INTEGER,
			liftoffcharge: DataTypes.INTEGER,
			gtcond: DataTypes.STRING,

			wastuff: DataTypes.STRING,
			wastrip: DataTypes.STRING,
			securityinid: DataTypes.INTEGER,
			securityinname: DataTypes.STRING,
			securityindatetime: DataTypes.DATE,
			securityoutid: DataTypes.INTEGER,
			securityoutname: DataTypes.STRING,
			securityoutdatetime: DataTypes.DATE,

		},
		{
			sequelize,
			modelName: "container_process",
			underscored: true,
			freezeTableName: true,
			tableName: "container_process",
			createdAt: false,
			updatedAt: false,
		}
	);

	return container_process;
};
