const { VoteOption } = require('../models');

exports.getAllVoteOptions = async (req, res) => {
    try {
        const voteOptions = await VoteOption.findAll();
        res.status(200).json(voteOptions);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.createVoteOption = async (req, res) => {
    try {
        const newVoteOption = await VoteOption.create(req.body);
        res.status(201).json(newVoteOption);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.getVoteOptionById = async (req, res) => {
    try {
        const voteOption = await VoteOption.findByPk(req.params.id);
        if (!voteOption) {
            res.status(404).json({ error: 'Vote option not found' });
        } else {
            res.status(200).json(voteOption);
        }
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.updateVoteOptionById = async (req, res) => {
    try {
        const updatedVoteOption = await VoteOption.update(req.body, {
            where: { id: req.params.id },
        });

        if (updatedVoteOption[0] === 0) {
            res.status(404).json({ error: 'Vote option not found' });
        } else {
            res.status(200).json({ message: 'Vote option updated' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.deleteVoteOptionById = async (req, res) => {
    try {
        const deletedVoteOption = await VoteOption.destroy({ where: { id: req.params.id } });
        if (deletedVoteOption === 0) {
            res.status(404).json({ error: 'Vote option not found' });
        } else {
            res.status(200).json({ message: 'Vote option deleted' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};
