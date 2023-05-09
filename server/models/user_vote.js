module.exports = (sequelize, DataTypes) => {
    const UserVote = sequelize.define('UserVote', {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        vote_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'votes',
                key: 'id',
            },
        },
        option_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'vote_options',
                key: 'id',
            },
        },
    }, {
        tableName: 'user_votes',
        timestamps: false,
    });

    UserVote.associate = (models) => {
        UserVote.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user',
        });
        UserVote.belongsTo(models.Vote, {
            foreignKey: 'vote_id',
            as: 'vote',
        });
        UserVote.belongsTo(models.VoteOption, {
            foreignKey: 'option_id',
            as: 'option',
        });
    };

    return UserVote;
};
