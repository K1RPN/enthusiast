const { Chat } = require('../models');

exports.getAllChats = async (req, res) => {
    try {
        const chats = await Chat.findAll();
        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.createChat = async (req, res) => {
    try {
        const newChat = await Chat.create(req.body);
        res.status(201).json(newChat);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.getChatById = async (req, res) => {
    try {
        const chat = await Chat.findByPk(req.params.id);
        if (!chat) {
            res.status(404).json({ error: 'Chat not found' });
        } else {
            res.status(200).json(chat);
        }
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.updateChatById = async (req, res) => {
    try {
        const updatedChat = await Chat.update(req.body, { where: { id: req.params.id } });
        if (updatedChat[0] === 0) {
            res.status(404).json({ error: 'Chat not found' });
        } else {
            res.status(200).json({ message: 'Chat updated' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.deleteChatById = async (req, res) => {
    try {
        const deletedChat = await Chat.destroy({ where: { id: req.params.id } });
        if (deletedChat === 0) {
            res.status(404).json({ error: 'Chat not found' });
        } else {
            res.status(200).json({ message: 'Chat deleted' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};
