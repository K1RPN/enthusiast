module.exports = (sequelize, DataTypes) => {
    const Friendship = sequelize.define('Friendship', {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        friend_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: 'friendships',
        timestamps: false,
    });

    Friendship.associate = (models) => {
        Friendship.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user',
        });
        Friendship.belongsTo(models.User, {
            foreignKey: 'friend_id',
            as: 'friend',
        });
    };

    return Friendship;
};
