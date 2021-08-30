"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class tblusers extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			tblusers.belongsTo(models.tblgroups,
				{
					foreignKey: {
						name: "group_id"
					}, as : "groups"
				});

		}

	}
	tblusers.init(
		{
			user_id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true,
			},
			group_id: DataTypes.INTEGER,
			prcode: DataTypes.STRING,
			username: DataTypes.STRING,
			fullname: DataTypes.STRING,
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			last_login: DataTypes.DATE,
			last_activity: DataTypes.DATE,
			is_login: DataTypes.STRING,
			last_module: DataTypes.STRING,
			login_token: DataTypes.STRING,
			is_block: DataTypes.STRING,
			salt: DataTypes.STRING,
			first_login: DataTypes.STRING,
			last_pass_change: DataTypes.DATE,
			created_date: DataTypes.DATE,
			created_by: DataTypes.STRING,
			updated_date: DataTypes.DATE,
			updated_by: DataTypes.STRING
		},
		{
			sequelize,
			modelName: "tblusers",
			underscored: true,
			timestamps: false
		}
	);

	Object.defineProperty(tblusers.prototype, "entity", {
		get() {
			return {
				user_id: this.user_id,
				fullname: this.fullname,
				username: this.username,
				email: this.email,
			};
		},
	});

	return tblusers;
};
