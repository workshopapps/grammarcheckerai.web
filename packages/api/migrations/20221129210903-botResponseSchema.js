'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('botResponse', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			transcribedAudioText: {
				type: Sequelize.STRING,
			},
			correctedText: {
				type: Sequelize.STRING,
			},
			botReply: {
				type: Sequelize.STRING
			},
			language: {
				type: Sequelize.STRING,
				defaultValue: "English"
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
		await queryInterface.dropTable('botResponse');
	}
};