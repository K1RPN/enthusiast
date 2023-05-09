const { User } = require('../models');
const { Op } = require('sequelize');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};


exports.deleteUserById = async (req, res) => {
    try {
        const deletedUser = await User.destroy({ where: { id: req.params.id } });
        if (deletedUser === 0) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.status(200).json({ message: 'User deleted' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};
exports.searchUsers = async (req, res) => {
    try {
        const { username } = req.query;

        const users = await User.findAll({
            where: {
                username: {
                    [Op.iLike]: `%${username}%`,
                },
            },
        });

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while searching for users' });
    }
};
exports.filterUsers = async (req, res) => {
    try {
        const { interests } = req.query;

        const users = await User.findAll({
            where: {
                interests: {
                    [Op.contains]: interests.split(','),
                },
            },
        });

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while filtering users' });
    }
};
exports.getUsers = async (req, res) => {
    const interests = req.query.interests ? req.query.interests.split(',') : [];

    try {
        let users;
        if (interests.length > 0) {
            users = await User.findAll({
                include: {
                    model: Interest,
                    as: 'interests',
                    where: { name: interests },
                    through: { attributes: [] }
                }
            });
        } else {
            users = await User.findAll();
        }

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users.' });
    }
};
exports.updateUser = async (req, res) => {
    const { age, avatar, occupation } = req.body;
    const userId = req.params.userId;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'Пользователь не найден' });
        }

        await user.update({
            age: age ? age : user.age,
            avatar: avatar ? avatar : user.avatar,
            occupation: occupation ? occupation : user.occupation,
        });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка обновления пользователя' });
    }
};