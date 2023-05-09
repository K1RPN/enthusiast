module.exports = (sequelize, DataTypes) => {
    const ChatMember = sequelize.define('ChatMember', {
        chat_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'chats',
                key: 'id',
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
        },
    }, {
        tableName: 'chat_members',
        timestamps: false,
    });

    ChatMember.associate = (models) => {
        ChatMember.belongsTo(models.Chat, {
            foreignKey: 'chat_id',
            as: 'chat',
        });
        ChatMember.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user',
        });
    };

    return ChatMember;
};
