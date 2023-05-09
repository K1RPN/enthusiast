module.exports = (sequelize, DataTypes) => {
    const VoteOption = sequelize.define('VoteOption', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        vote_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'votes',
                key: 'id',
            },
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: 'vote_options',
        timestamps: false,
    });

    VoteOption.associate = (models) => {
        VoteOption.belongsTo(models.Vote, {
            foreignKey: 'vote_id',
            as: 'vote',
        });
        VoteOption.hasMany(models.UserVote, {
            foreignKey: 'option_id',
            as: 'userVotes',
        });
    };

    return VoteOption;
};
