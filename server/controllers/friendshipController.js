const { Friendship } = require('../models');

exports.getAllFriendships = async (req, res) => {
    try {
        const friendships = await Friendship.findAll();
        res.status(200).json(friendships);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.createFriendship = async (req, res) => {
    try {
        const newFriendship = await Friendship.create(req.body);
        res.status(201).json(newFriendship);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.getFriendshipById = async (req, res) => {
    try {
        const friendship = await Friendship.findByPk(req.params.id);
        if (!friendship) {
            res.status(404).json({ error: 'Friendship not found' });
        } else {
            res.status(200).json(friendship);
        }
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.updateFriendshipById = async (req, res) => {
    try {
        const updatedFriendship = await Friendship.update(req.body, {
            where: { id: req.params.id },
        });

        if (updatedFriendship[0] === 0) {
            res.status(404).json({ error: 'Friendship not found' });
        } else {
            res.status(200).json({ message: 'Friendship updated' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.deleteFriendshipById = async (req, res) => {
    try {
        const deletedFriendship = await Friendship.destroy({ where: { id: req.params.id } });
        if (deletedFriendship === 0) {
            res.status(404).json({ error: 'Friendship not found' });
        } else {
            res.status(200).json({ message: 'Friendship deleted' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};