"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class container extends Model {
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
			container.belongsTo(models.container_type,
				{
					foreignKey: "ctcode",
				});
		}
	}

	container.init(
		{
			cccode: DataTypes.STRING,
<<<<<<< HEAD
            ctcode: DataTypes.STRING,
            cclength: DataTypes.DECIMAL,
			ccheight: DataTypes.DECIMAL,
			ccalias1: DataTypes.STRING,
			ccalias2: DataTypes.STRING,
            created_at: DataTypes.DATE,
            created_by: DataTypes.NUMBER,
            updated_at: DataTypes.DATE,
            updated_by: DataTypes.NUMBER
=======
			ctcode: DataTypes.STRING,
			cclength: DataTypes.DECIMAL,
			ccheight: DataTypes.DECIMAL,
			created_at: DataTypes.DATE,
			created_by: DataTypes.NUMBER,
			updated_at: DataTypes.DATE,
			updated_by: DataTypes.NUMBER
>>>>>>> faef105b17e24324567a07b771a13217e77e3ef2

		},
		{
			sequelize,
			modelName: "container",
			underscored: true,
			freezeTableName: true,
            tableName: "tblcontainer_code",
		}
	);

	Object.defineProperty(container.prototype, "entity", {
		get() {
			return {
				cccode: this.cccode,
<<<<<<< HEAD
                ctcode: this.ctcode,
                cclength: this.cclength,
				ccheight: this.ccheight,
				ccalias1: this.ccalias1,
				ccalias2: this.ccalias2,
                created_at: this.created_at,
                created_by: this.created_by,
                updated_at: this.updated_at,
                updated_by: this.updated_by,
=======
				ctcode: this.ctcode,
				cclength: this.cclength,
				ccheight: this.ccheight,
				created_at: this.created_at,
				created_by: this.created_by,
				updated_at: this.updated_at,
				updated_by: this.updated_by,
>>>>>>> faef105b17e24324567a07b771a13217e77e3ef2
			};
		},
	});

	return container;
};
