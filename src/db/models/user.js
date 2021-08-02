"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class user extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	user.init(
		{
			fullname: DataTypes.STRING,
			username: DataTypes.STRING,
			password: DataTypes.STRING,
			email: DataTypes.STRING,
			phone_number: DataTypes.STRING,
			photo: DataTypes.STRING,
			delete_at: DataTypes.DATE,
		},
		{
			sequelize,
			modelName: "user",
			underscored: true,
		}
	);

	Object.defineProperty(user.prototype, "entity", {
		get() {
			return {
				id: this.id,
				fullname: this.fullname,
				username: this.username,
				email: this.email,
				phone_number: this.phone_number,
				photo: this.photo,
			};
		},
	});

	return user;
};
