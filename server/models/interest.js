module.exports = (sequelize, DataTypes) => {
    const Interest = sequelize.define('Interest', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Interest.associate = (models) => {
        Interest.belongsToMany(models.User, {
            through: 'UserInterest',
            as: 'users',
            foreignKey: 'interestId'
        });
    };

    return Interest;
};
