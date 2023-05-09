module.exports = (sequelize, DataTypes) => {
    const UserInterest = sequelize.define('UserInterest', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        interestId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        }
    });

    return UserInterest;
};
