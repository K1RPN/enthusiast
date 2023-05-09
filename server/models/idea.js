const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Idea = sequelize.define('Idea', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    });

    return Idea;
};
