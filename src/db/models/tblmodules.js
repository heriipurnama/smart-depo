"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class tblmodules extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			// container.hasOne(models.container_type,
			// {
			// 	foreignKey: 'ctcode',
			// });
			tblmodules.belongsTo(models.privilege,
            {
                foreignKey: "module_id",
            });
		}
	}

	tblmodules.init(
        {
            module_id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
				allowNull: false,
				autoIncrement: true,
            },
            module_parent: DataTypes.INTEGER,
            module_var: DataTypes.STRING,
            module_name: DataTypes.STRING,
            module_description: DataTypes.STRING,
            module_status: DataTypes.INTEGER,
            module_url: DataTypes.STRING,
            module_config: DataTypes.STRING,
            module_icon: DataTypes.STRING,
            sort_index: DataTypes.DECIMAL,
            module_content: DataTypes.STRING,
            module_type: DataTypes.STRING

        },
        {
                sequelize,
                modelName: "tblmodules",
                underscored: true,
                freezeTableName: true,
                tableName: "tblmodules",
                createdAt: false,
                updatedAt: false
        }
	);

	Object.defineProperty(tblmodules.prototype, "entity", {
		get() {
			return {
                module_parent: this.module_parent,
                module_var: this.module_var,
                module_name: this.module_name,
                module_description: this.module_description,
                module_status: this.module_status,
                module_url: this.module_url,
                module_config: this.module_config,
                module_icon: this.module_icon,
                sort_index: this.sort_index,
                module_content: this.module_content,
                module_type: this.module_type
			};
		},
	});

	return tblmodules;
};
