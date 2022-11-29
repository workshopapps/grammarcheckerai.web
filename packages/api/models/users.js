const Sequelize = require('sequelize');
const { Model } = require('sequelize');
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { environment } = require("../config/environment");
const { JWT_SECRET } = environment;

module.exports = (sequelize, DataTypes) => {
  return users.init(sequelize, DataTypes);
}

class users extends Sequelize.Model {
	static associate(models) {
		users.hasMany(models.conversation, {
			foreignKey: "id"
		}),

		users.hasMany(models.message, {
			foreignKey: "id"
		})
	}
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "email"
    },
    firstName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    role: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "user"
    },
    language: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "English"
    },
    deviceID: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    createdby: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedby: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'users',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
    ]
  });
  }
}

users.afterCreate(async (user) => {
	const salt = await bcrypt.genSalt(10);
	let password = await bcrypt.hash(user.password, salt);
	await user.update({
		password: password
	}, { where: { password: password } })
})
