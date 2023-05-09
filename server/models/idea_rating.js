module.exports = (sequelize, DataTypes) => {
    const IdeaRating = sequelize.define('IdeaRating', {
        idea_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'ideas',
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
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        tableName: 'idea_ratings',
        timestamps: false,
    });

    IdeaRating.associate = (models) => {
        IdeaRating.belongsTo(models.Idea, {
            foreignKey: 'idea_id',
            as: 'idea',
        });
        IdeaRating.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user',
        });
    };

    return IdeaRating;
};
