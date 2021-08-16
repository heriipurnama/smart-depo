"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class city extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			city.belongsTo(models.container_code,
            {
                foreignKey: "city_id",
            });
		}
	}

	city.init(
        {
            city_id:{
                type: DataTypes.STRING,
                primaryKey: true,
                autoIncrement: true
            },
            city_name: DataTypes.STRING,
            encode: DataTypes.STRING

        },
        {
                sequelize,
                modelName: "city",
                underscored: true,
                freezeTableName: true,
                tableName: "tblcity",
                createdAt: false,
                updatedAt: false
        }
	);

	Object.defineProperty(city.prototype, "entity", {
		get() {
			return {
				city_id: this.city_id,
                city_name: this.city_name,
                encode: this.encode
			};
		},
	});

	return city;
};
