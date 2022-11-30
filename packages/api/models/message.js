const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return message.init(sequelize, DataTypes);
}

class message extends Sequelize.Model {
	static associate(models) {
		message.belongsTo(models.users, {
			foreignKey: "userResponseId"
		}),

		message.belongsTo(models.botresponse, {
			foreignKey: "botResponseId"
		}),

		message.belongsTo(models.conversation, {
			foreignKey: "conversationId"
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
    conversationId: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    userResponseId: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    botResponseId: {
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
    tableName: 'message',
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
    ]
  });
  }
}
