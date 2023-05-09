module.exports = (sequelize, DataTypes) => {
    const StartupMember = sequelize.define('StartupMember', {
        startup_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'startups',
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
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: 'startup_members',
        timestamps: false,
    });

    StartupMember.associate = (models) => {
        StartupMember.belongsTo(models.Startup, {
            foreignKey: 'startup_id',
            as: 'startup',
        });
        StartupMember.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user',
        });
    };

    return StartupMember;
};
