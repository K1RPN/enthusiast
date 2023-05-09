module.exports = (sequelize, DataTypes) => {
    const Chat = sequelize.define('Chat', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: 'chats',
        timestamps: false,
    });

    Chat.associate = (models) => {
        Chat.hasMany(models.Message, {
            foreignKey: 'chat_id',
            as: 'messages',
        });
        Chat.hasMany(models.ChatMember, {
            foreignKey: 'chat_id',
            as: 'members',
        });
        Chat.hasMany(models.Vote, {
            foreignKey: 'chat_id',
            as: 'votes',
        });
    };

    return Chat;
};