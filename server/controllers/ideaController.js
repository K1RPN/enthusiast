const Idea = require('../models/idea');
const IdeaVote = require('../models/idea_vote');

exports.getIdeas = async (req, res) => {
    try {
        const ideas = await Idea.findAll();
        res.status(200).json(ideas);
    } catch (error) {
        res.status(500).json({ message: 'Error getting ideas' });
    }
};

exports.voteIdea = async (req, res) => {
    const { userId, ideaId, value } = req.body;

    try {
        const existingVote = await IdeaVote.findOne({ where: { userId, ideaId } });

        if (existingVote) {
            existingVote.value = value;
            await existingVote.save();
        } else {
            await IdeaVote.create({ userId, ideaId, value });
        }

        res.status(200).json({ message: 'Vote saved' });
    } catch (error) {
        res.status(500).json({ message: 'Error voting for idea' });
    }
};
