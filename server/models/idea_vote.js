const { DataTypes } = require('sequelize');
const sequelize = require('./index');

module.exports = (sequelize) => {
    const IdeaVote = sequelize.define('IdeaVote', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        ideaId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        value: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
    return IdeaVote;
}