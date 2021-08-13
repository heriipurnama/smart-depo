"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class privilege extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			// privilege.hasMany(models.tblmodules,
			// {
			// 	foreignKey: 'module_id',
			// });
			privilege.belongsTo(models.tblmodules,
            {
                foreignKey: "module_id",
                as: "modules"
            });
		}
	}

	privilege.init(
        {
            privilege_id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
				allowNull: false,
				autoIncrement: true,
            },
            group_id: DataTypes.INTEGER,
            module_id: DataTypes.INTEGER,
            has_insert: DataTypes.INTEGER,
            has_update: DataTypes.INTEGER,
            has_delete: DataTypes.INTEGER,
            has_approval: DataTypes.INTEGER,
            has_view: DataTypes.INTEGER,
            has_printpdf: DataTypes.INTEGER,
            has_printxls: DataTypes.INTEGER

        },
        {
                sequelize,
                modelName: "privilege",
                underscored: true,
                freezeTableName: true,
                tableName: "tblprivilege",
                createdAt: false,
                updatedAt: false
        }
	);

	Object.defineProperty(privilege.prototype, "entity", {
		get() {
			return {
			group_id: this.group_id,
            module_id: this.module_id,
            has_insert: this.has_insert,
            has_update: this.has_update,
            has_delete: this.has_delete,
            has_approval: this.has_approval,
            has_view: this.has_view,
            has_printpdf: this.has_printpdf,
            has_printxls: this.has_printxls
			};
		},
	});

	return privilege;
};
