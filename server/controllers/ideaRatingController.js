const { IdeaRating } = require('../models');

exports.getAllIdeaRatings = async (req, res) => {
    try {
        const ideaRatings = await IdeaRating.findAll();
        res.status(200).json(ideaRatings);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.createIdeaRating = async (req, res) => {
    try {
        const newIdeaRating = await IdeaRating.create(req.body);
        res.status(201).json(newIdeaRating);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.getIdeaRatingById = async (req, res) => {
    try {
        const ideaRating = await IdeaRating.findByPk(req.params.id);
        if (!ideaRating) {
            res.status(404).json({ error: 'Idea rating not found' });
        } else {
            res.status(200).json(ideaRating);
        }
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.updateIdeaRatingById = async (req, res) => {
    try {
        const updatedIdeaRating = await IdeaRating.update(req.body, {where: { id: req.params.id }, });
        if (updatedIdeaRating[0] === 0) {
            res.status(404).json({ error: 'Idea rating not found' });
        } else {
            res.status(200).json({ message: 'Idea rating updated' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};
exports.deleteIdeaRatingById = async (req, res) => {
    try {
        const deletedIdeaRating = await IdeaRating.destroy({ where: { id: req.params.id } });
        if (deletedIdeaRating === 0) {
            res.status(404).json({ error: 'Idea rating not found' });
        } else {
            res.status(200).json({ message: 'Idea rating deleted' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};