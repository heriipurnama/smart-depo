"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class country extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			country.belongsTo(models.city,
            {
                foreignKey: "cncode",
            });
		}
	}

	country.init(
        {
            cncode: {
				type: DataTypes.STRING,
				primaryKey: true
			},
            cndesc: DataTypes.STRING

        },
        {
                sequelize,
                modelName: "country",
                underscored: true,
                freezeTableName: true,
                tableName: "tblcountry",
                createdAt: false,
                updatedAt: false
        }
	);

	Object.defineProperty(country.prototype, "entity", {
		get() {
			return {
                cncode: this.cncode,
                cndesc: this.cndesc
			};
		},
	});

	return country;
};
