const { UserVote } = require('../models');

exports.getAllUserVotes = async (req, res) => {
    try {
        const userVotes = await UserVote.findAll();
        res.status(200).json(userVotes);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.createUserVote = async (req, res) => {
    try {
        const newUserVote = await UserVote.create(req.body);
        res.status(201).json(newUserVote);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.getUserVoteById = async (req, res) => {
    try {
        const userVote = await UserVote.findByPk(req.params.id);
        if (!userVote) {
            res.status(404).json({ error: 'User vote not found' });
        } else {
            res.status(200).json(userVote);
        }
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.updateUserVoteById = async (req, res) => {
    try {
        const updatedUserVote = await UserVote.update(req.body, {
            where: { id: req.params.id },
        });

        if (updatedUserVote[0] === 0) {
            res.status(404).json({ error: 'User vote not found' });
        } else {
            res.status(200).json({ message: 'User vote updated' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.deleteUserVoteById = async (req, res) => {
    try {
        const deletedUserVote = await UserVote.destroy({ where: { id: req.params.id } });
        if (deletedUserVote === 0) {
            res.status(404).json({ error: 'User vote not found' });
        } else {
            res.status(200).json({ message: 'User vote deleted' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};