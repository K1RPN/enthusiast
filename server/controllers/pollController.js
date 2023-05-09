const { Poll, PollOption } = require('../models');

module.exports = {
    async create(req, res) {
        try {
            const poll = await Poll.create({
                question: req.body.question,
                chatId: req.params.chatId,
            });

            const options = req.body.options.map((option) => ({
                ...option,
                pollId: poll.id,
            }));

            await PollOption.bulkCreate(options);

            return res.status(201).json(poll);
        } catch (err) {
            return res.status(500).json({ error: 'Failed to create poll' });
        }
    },

    async list(req, res) {
        try {
            const polls = await Poll.findAll({
                where: { chatId: req.params.chatId },
                include: [{ model: PollOption, as: 'options' }],
            });
            return res.status(200).json(polls);
        } catch (err) {
            return res.status(500).json({ error: 'Failed to fetch polls' });
        }
    },

    async vote(req, res) {
        try {
            const option = await PollOption.findOne({
                where: { id: req.params.optionId },
            });

            if (!option) {
                return res.status(404).json({ error: 'Option not found' });
            }

            await option.increment('votes');

            return res.status(200).json({ message: 'Vote counted' });
        } catch (err) {
            return res.status(500).json({ error: 'Failed to register vote' });
        }
    },
};

