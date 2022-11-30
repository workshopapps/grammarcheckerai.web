'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('message', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			conversationId: {
				type: Sequelize.STRING,
			},
			userResponseId: {
				type: Sequelize.STRING
			},
			botResponseId: {
				type: Sequelize.STRING
			},
			createdby: {
				type: Sequelize.DATE
			},
			updatedby: {
				type: Sequelize.DATE
			}
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('message');
	}
};