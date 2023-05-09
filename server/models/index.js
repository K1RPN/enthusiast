const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const config = require('../config/config.json')['development'];

const basename = path.basename(__filename);
const db = {};

fs.readdirSync(__dirname)
    .filter((file) => {
        return (
            file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
        );
    })
    .forEach((file) => {
        if (file !== 'models.js') {
            const modelCreator = require(path.join(__dirname, file));
            const model = modelCreator(sequelize, Sequelize.DataTypes);
            db[model.name] = model;
        }
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

// Импортируем файл models.js для объявления связей между моделями
const setAssociations = require('./models');
setAssociations(db);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
