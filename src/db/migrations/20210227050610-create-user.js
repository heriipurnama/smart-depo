"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("users", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			fullname: {
				type: Sequelize.STRING(20),
			},
			username: {
				type: Sequelize.STRING(20),
			},
			password: {
				type: Sequelize.STRING,
			},
			email: {
				type: Sequelize.STRING(30),
			},
			phone_number: {
				type: Sequelize.STRING(20),
			},
			photo: {
				type: Sequelize.STRING,
			},
			delete_at: {
				type: Sequelize.DATE,
			},
			created_at: {
				allowNull: true,
				type: Sequelize.DATE,
			},
			updated_at: {
				allowNull: true,
				type: Sequelize.DATE,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("users");
	},
};
