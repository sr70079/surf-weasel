const Sequelize = require('sequelize');

// database name, username , password, email, name, {connection info}
const sequelize = new Sequelize('users_db', 'admin', '12345678', 'joeshmo@gmail.com', 'Joe', {
  dialect: 'mysql',
  host: 'localhost',
  port: 3306

});

module.exports = sequelize;

// module.exports = {
//   development: {
//     username: process.env.SEQUELIZE_USER,
//     password: process.env.SEQUELIZE_PASSWORD,
//     database: 'userinfo_db',
//     dialect: 'mysql',
//     host: process.env.SEQUELIZE_HOST,
//     port: 3306
//   },
//   test: {
//     username: process.env.TU,
//     password: process.env.TP || null,
//     database: 'userinfo_test',
//     host: 'localhost',
//     port: 3306,
//     dialect: 'mysql',
//     logging: false
//   },
//   production: {
//     'use_env_variable': 'JAWSDB_URL',
//     dialect: 'mysql'
//   }
// };
