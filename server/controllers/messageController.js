const { Message } = require('../models');

module.exports = {
    async create(req, res) {
        try {
            const message = await Message.create({
                text: req.body.text,
                encrypted: req.body.encrypted,
                userId: req.userId,
                chatId: req.params.chatId,
            });
            return res.status(201).json(message);
        } catch (err) {
            return res.status(500).json({ error: 'Failed to create message' });
        }
    },

    async list(req, res) {
        try {
            const messages = await Message.findAll({
                where: { chatId: req.params.chatId },
                order: [['createdAt', 'ASC']],
            });
            return res.status(200).json(messages);
        } catch (err) {
            return res.status(500).json({ error: 'Failed to fetch messages' });
        }
    },
};
