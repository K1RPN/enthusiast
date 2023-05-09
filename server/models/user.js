module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'user',
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        occupation: {
            type: DataTypes.STRING,
            allowNull: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        birthdate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    }, {
        tableName: 'users',
        timestamps: false,
    });

    User.associate = (models) => {
        User.hasMany(models.Friendship, {
            foreignKey: 'user_id',
            as: 'friendships',
        });
        User.hasMany(models.ChatMember, {
            foreignKey: 'user_id',
            as: 'chats',
        });
        User.hasMany(models.Message, {
            foreignKey: 'user_id',
            as: 'messages',
        });
        User.hasMany(models.Idea, {
            foreignKey: 'user_id',
            as: 'ideas',
        });
        User.hasMany(models.IdeaRating, {
            foreignKey: 'user_id',
            as: 'ideaRatings',
        });
        User.hasMany(models.StartupMember, {
            foreignKey: 'user_id',
            as: 'startups',
        });
        User.hasMany(models.UserVote, {
            foreignKey: 'user_id',
            as: 'votes',
        });
    };

    return User;
};
