const Sequelize = require('sequelize');

const sequelize = require('../config/connection.js');

const users = sequelize.define('users', {

  username: Sequelize.STRING,
  password: Sequelize.STRING,
  email: Sequelize.STRING,
  name: Sequelize.STRING

});

users.sync();

module.exports = users;
