module.exports = (sequelize, DataTypes) => {
    const Poll = sequelize.define('Poll', {
        question: DataTypes.TEXT,
    });

    Poll.associate = function (models) {
        Poll.belongsTo(models.Chat, { foreignKey: 'chatId', as: 'chat' });
        Poll.hasMany(models.PollOption, { foreignKey: 'pollId', as: 'options' });
    };

    return Poll;
};
