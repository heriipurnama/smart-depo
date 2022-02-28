"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class security_process extends Model {
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

	security_process.init(
		{
			id:{
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            cpid: DataTypes.STRING,
            securitytype: DataTypes.INTEGER,
			securityinid: DataTypes.INTEGER,
			securityname: DataTypes.STRING,
			securitydatetime: DataTypes.DATE,
			
		},
		{
			sequelize,
			modelName: "security_process",
			underscored: true,
			freezeTableName: true,
			tableName: "security_process",
			createdAt: false,
			updatedAt: false,
		}
	);

	return security_process;
};
