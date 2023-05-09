module.exports = (sequelize, DataTypes) => {
    const Startup = sequelize.define('Startup', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        stage: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: 'startups',
        timestamps: false,
    });

    Startup.associate = (models) => {
        Startup.hasMany(models.StartupMember, {
            foreignKey: 'startup_id',
            as: 'members',
        });
    };

    return Startup;
};
