'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('contact', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			firstName: {
				type: Sequelize.STRING,
				allowNull: false
			},
			lastName: {
				type: Sequelize.STRING,
				allowNull: false
			},
			email: {
				type: Sequelize.STRING,
				unique: true,
				allowNull: false
			},
			phoneNumber: {
				type: Sequelize.STRING,
				allowNull: false
			},
			message: {
				type: Sequelize.STRING,
				allowNull: false
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
		await queryInterface.dropTable('contact');
	}
};