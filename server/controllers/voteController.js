const { Vote } = require('../models');

exports.getAllVotes = async (req, res) => {
    try {
        const votes = await Vote.findAll();
        res.status(200).json(votes);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.createVote = async (req, res) => {
    try {
        const newVote = await Vote.create(req.body);
        res.status(201).json(newVote);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.getVoteById = async (req, res) => {
    try {
        const vote = await Vote.findByPk(req.params.id);
        if (!vote) {
            res.status(404).json({ error: 'Vote not found' });
        } else {
            res.status(200).json(vote);
        }
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.updateVoteById = async (req, res) => {
    try {
        const updatedVote = await Vote.update(req.body, {
            where: { id: req.params.id },
        });

        if (updatedVote[0] === 0) {
            res.status(404).json({ error: 'Vote not found' });
        } else {
            res.status(200).json({ message: 'Vote updated' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.deleteVoteById = async (req, res) => {
    try {
        const deletedVote = await Vote.destroy({ where: { id: req.params.id } });
        if (deletedVote === 0) {
            res.status(404).json({ error: 'Vote not found' });
        } else {
            res.status(200).json({ message: 'Vote deleted' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};
