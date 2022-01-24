"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class vessel extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			vessel.belongsTo(models.country,
				{
					foreignKey: "cncode",
				});
		}
	}

	vessel.init(
		{
			vesid:{
				type: DataTypes.STRING,
				primaryKey: true
			},
			vesopr: DataTypes.STRING,
			cncode: DataTypes.STRING,
			vestitle: DataTypes.STRING,
			prcode: DataTypes.STRING,

		},
		{
			sequelize,
			modelName: "vessel",
			underscored: true,
			freezeTableName: true,
			tableName: "tblvessel",
			createdAt: false,
			updatedAt: false
		}
	);

	Object.defineProperty(vessel.prototype, "entity", {
		get() {
			return {
				vesid: this.vesid,
				vesopr: this.vesopr,
				cncode: this.cncode,
				vestitle: this.vestitle
			};
		},
	});

	return vessel;
};
