const DataTypes = require("sequelize").DataTypes;
const _botresponse = require("./botresponse");
const _conversation = require("./conversation");
const _message = require("./message");
const _sequelizemeta = require("./sequelizemeta");
const _userresponse = require("./userresponse");
const _users = require("./users");

function initModels(sequelize) {
  const botresponse = _botresponse(sequelize, DataTypes);
  const conversation = _conversation(sequelize, DataTypes);
  const message = _message(sequelize, DataTypes);
  const sequelizemeta = _sequelizemeta(sequelize, DataTypes);
  const userresponse = _userresponse(sequelize, DataTypes);
  const users = _users(sequelize, DataTypes);


  return {
    botresponse,
    conversation,
    message,
    sequelizemeta,
    userresponse,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
