"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class port extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			// port.belongsTo(models.vessel,
			// {
			//     foreignKey: "cncode",
			// });
		}
	}

	port.init(
		{
			poport:{
				type: DataTypes.STRING,
				primaryKey: true
			},
			cncode: DataTypes.STRING,
			poid: DataTypes.STRING,
			podesc: DataTypes.STRING

		},
		{
			sequelize,
			modelName: "port",
			underscored: true,
			freezeTableName: true,
			tableName: "tblport",
			createdAt: false,
			updatedAt: false
		}
	);

	Object.defineProperty(port.prototype, "entity", {
		get() {
			return {
				poid: this.poid,
				cncode: this.cncode,
				poport: this.poport,
				podesc: this.podesc
			};
		},
	});

	return port;
};
