module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('Message', {
        text: DataTypes.TEXT,
        encrypted: DataTypes.BOOLEAN,
    });

    Message.associate = function (models) {
        Message.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
        Message.belongsTo(models.Chat, { foreignKey: 'chatId', as: 'chat' });
    };

    return Message;
};
