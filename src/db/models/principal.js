"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class principal extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			// container.belongsTo(models.container,
			// {
			// 	foreignKey: 'ctcode',
			// })
		}
	}

	principal.init(
		{
            prcode:{
                type: DataTypes.STRING,
                primaryKey: true
            },
            cucode: DataTypes.STRING,
            cncode: DataTypes.STRING,
            prname: DataTypes.STRING,
            praddr: DataTypes.STRING,
            prremark: DataTypes.STRING,
            prflag1: DataTypes.INTEGER,
            prflag2: DataTypes.INTEGER,
            prautapp: DataTypes.INTEGER,
            prautbb: DataTypes.INTEGER,
            prautbm: DataTypes.INTEGER,
            przip: DataTypes.STRING,
            prphone: DataTypes.STRING,
            prfax: DataTypes.STRING,
            prcontact: DataTypes.STRING,
            premail: DataTypes.STRING,
            prcontractno: DataTypes.STRING,
            prrepono: DataTypes.STRING,
            prdamageno: DataTypes.STRING,
            prexp: DataTypes.DATE,
            prtocust1: DataTypes.STRING,
            prtocust2: DataTypes.STRING,
            prinfocu: DataTypes.STRING,
            prphcust: DataTypes.STRING,
            prfacust: DataTypes.STRING,
            prcccust1: DataTypes.STRING,
            prcccust2: DataTypes.STRING,
            prinfocc: DataTypes.STRING,
            prfmmtc: DataTypes.STRING,
            prccmtc: DataTypes.STRING,
            prfield1: DataTypes.TEXT,
            eirnocedex: DataTypes.INTEGER,
            prcrton: DataTypes.DATE,
            prcrtby: DataTypes.STRING,
            prmdfon: DataTypes.DATE,
            prmdfby: DataTypes.STRING,
            prcono: DataTypes.STRING,
            prdmno: DataTypes.STRING,
            prrtno: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "principal",
			underscored: true,
            freezeTableName: true,
            tableName: "tblprincipal",
            createdAt: false,
            updatedAt: false

		}
	);

	Object.defineProperty(principal.prototype, "entity", {
		get() {
			return {
                prcode: this.group_id,
				cucode: this.cucode,
                cncode: this.cncode,
                prname: this.prname,
                praddr: this.praddr,
                prremark: this.prremark,
                prflag1: this.prflag1,
                prflag2: this.prflag2,
                prautapp: this.prautapp,
                prautbb: this.prautbb,
                prautbm: this.prautbm,
                przip: this.przip,
                prphone: this.prphone,
                prfax: this.prfax,
                prcontact: this.prcontact,
                premail: this.premail,
                prcontractno: this.prcontractno,
                prrepono: this.prrepono,
                prdamageno: this.prdamageno,
                prexp_date: this.prexp_date,
                prtocust1: this.prtocust1,
                prtocust2: this.prtocust2,
                prinfocu: this.prinfocu,
                prphcust: this.prphcust,
                prfacust: this.prfacust,
                prcccust1: this.prcccust1,
                prcccust2: this.prcccust2,
                prinfocc: this.prinfocc,
                prfmmtc: this.prfmmtc,
                prccmtc: this.prccmtc,
                prfield1: this.prfield1,
                eirnocedex: this.eirnocedex,
                prcrton: this.prcrton,
                prcrtby: this.prcrtby,
                prmdfon: this.prmdfon,
                prmdfby: this.prmdfby,
                prcono: this.prcono,
                prdmno: this.prdmno,
                prrtno: this.STRING,
			};
		},
	});

	return principal;
};
