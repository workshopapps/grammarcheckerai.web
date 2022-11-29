const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return userresponse.init(sequelize, DataTypes);
}

class userresponse extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    audioURL: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    textInput: {
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
    tableName: 'userresponse',
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
