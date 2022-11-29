const Sequelize = require('sequelize');
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  return conversation.init(sequelize, DataTypes);
}

class conversation extends Sequelize.Model {
	static associate(models) {
		conversation.belongsTo(models.user, {
			foreignKey: "userId"
		}),

		conversation.hasMany(models.message, {
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
    userId: {
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
    tableName: 'conversation',
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
