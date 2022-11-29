const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return botresponse.init(sequelize, DataTypes);
}

class botresponse extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    transcribedAudioText: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    correctedText: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    botReply: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    language: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "English"
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
    tableName: 'botresponse',
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
