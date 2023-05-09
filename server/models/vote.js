module.exports = (sequelize, DataTypes) => {
    const Vote = sequelize.define('Vote', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        chat_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'chats',
                key: 'id',
            },
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: 'votes',
        timestamps: false,
    });

    Vote.associate = (models) => {
        Vote.belongsTo(models.Chat, {
            foreignKey: 'chat_id',
            as: 'chat',
        });
        Vote.hasMany(models.VoteOption, {
            foreignKey: 'vote_id',
            as: 'options',
        });
        Vote.hasMany(models.UserVote, {
            foreignKey: 'vote_id',
            as: 'userVotes',
        });
    };

    return Vote;
};