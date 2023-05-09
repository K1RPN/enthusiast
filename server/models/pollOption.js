module.exports = (sequelize, DataTypes) => {
    const PollOption = sequelize.define('PollOption', {
        text: DataTypes.TEXT,
        votes: DataTypes.INTEGER,
    });

    PollOption.associate = function (models) {
        PollOption.belongsTo(models.Poll, { foreignKey: 'pollId', as: 'poll' });
    };

    return PollOption;
};
