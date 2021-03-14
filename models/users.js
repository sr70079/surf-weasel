const sequelize = require('sequelize');

const sequelize = require('../config/connection.js');

const users = sequelize.define('users', {

    username: sequelize.STRING,
    password: sequelize.STRING,
    email: sequelize.STRING,
    name: sequelize.STRING

});

users.sync();

module.exports = users;