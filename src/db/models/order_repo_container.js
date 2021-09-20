"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class order_repo_container extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}

	}
	order_repo_container.init(
		{
			repocrnoid: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true
			},
			repoid: DataTypes.INTEGER,
			crno: DataTypes.STRING,
			cccode: DataTypes.STRING,

			ctcode: DataTypes.STRING,
			cclength: DataTypes.INTEGER,
			ccheight: DataTypes.INTEGER,
			repofe: DataTypes.STRING,
			
			reposhold: DataTypes.INTEGER,
			reporemark: DataTypes.STRING,
			repogatedate: DataTypes.DATE,
			repoflag: DataTypes.INTEGER
		},
		{
			sequelize,
			tableName: "order_repo_container",
			freezeTableName: true,
			modelName: "orderRepoContainer",
			underscored: true,
			timestamps: false
		}
	);

	return order_repo_container;
};
