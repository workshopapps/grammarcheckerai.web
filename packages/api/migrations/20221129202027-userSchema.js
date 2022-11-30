'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING,
				unique: true,
				allowNull: false
      },
      firstName: {
        type: Sequelize.STRING,
				allowNull: false
      },
			lastName: {
        type: Sequelize.STRING,
				allowNull: false
      },
      password: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING,
				defaultValue: "user"
      },
      language: {
        type: Sequelize.STRING,
				defaultValue: "English"
      },
      deviceID: {
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
    await queryInterface.dropTable('users');
  }
};