const { Sequelize } = require('sequelize');
const config = require('./config.json')['development'];

const sequelize = new Sequelize(config.database, config.username, config.password, {
    ...config,
    dialect: 'postgres',
});

module.exports = sequelize;
