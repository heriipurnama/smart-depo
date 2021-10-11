"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class container_repair extends Model {
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

    container_repair.init(
        {
            svid:{
                type: DataTypes.STRING,
                primaryKey: true
            },
            rpid: DataTypes.INTEGER,
            rpver: DataTypes.INTEGER,
            erid: DataTypes.STRING,
            teid: DataTypes.STRING,
            clid: DataTypes.STRING,
            syid: DataTypes.STRING,
            wono: DataTypes.STRING,
            rpnoest: DataTypes.INTEGER,
            rpfinalest: DataTypes.STRING,
            rptglest: DataTypes.DATE,
            rpcrno: DataTypes.STRING,
            rpstsappv: DataTypes.INTEGER,
            rptglappv: DataTypes.DATE,
            rpworkdat: DataTypes.DATE,
            rptgltar: DataTypes.DATE,
            rpmridat: DataTypes.DATE,
            rpdrepair: DataTypes.DATE,
            rpworkoke: DataTypes.INTEGER,
            rpcondoke: DataTypes.STRING,
            rpinspoke: DataTypes.STRING,
            rptglwroke: DataTypes.DATE,
            rpmrodat: DataTypes.DATE,
            rphrodat: DataTypes.DATE,
            rpclidat: DataTypes.DATE,
            rpclodat: DataTypes.DATE,
            rpnotesa: DataTypes.STRING,
            rpnotesb: DataTypes.STRING,
            rpbillon: DataTypes.INTEGER,
            rpnotesw: DataTypes.STRING,
            rpnotesr: DataTypes.STRING,
            rptotalrmhr: DataTypes.DECIMAL,
            rptotalrlab: DataTypes.DECIMAL,
            rptotalrcost: DataTypes.DECIMAL,
            rptotalamount: DataTypes.DECIMAL,
            rprevenue: DataTypes.DECIMAL,
            rpfictive: DataTypes.INTEGER,
            rpautno: DataTypes.STRING,
            rpceir: DataTypes.STRING,
            rpappvtype: DataTypes.INTEGER,
            rpstsappvpr: DataTypes.INTEGER,
            rptglappvpr: DataTypes.STRING,
            rpcrton: DataTypes.STRING,
            rpcrtby: DataTypes.STRING,
            rpmdfon: DataTypes.STRING,
            rpmdfby: DataTypes.STRING,

        },
        {
            sequelize,
            modelName: "container_repair",
            underscored: true,
            freezeTableName: true,
            tableName: "container_repair",
            createdAt: false,
            updatedAt: false
        }
    );

    return container_repair;
};
