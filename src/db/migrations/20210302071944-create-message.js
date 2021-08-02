"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("messages", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			id_sender: {
				type: Sequelize.INTEGER,
			},
			id_receiver: {
				type: Sequelize.INTEGER,
			},
			message: {
				type: Sequelize.TEXT,
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
		await queryInterface.dropTable("messages");
	},
};
