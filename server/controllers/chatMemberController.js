const { ChatMember } = require('../models');

exports.getAllChatMembers = async (req, res) => {
    try {
        const chatMembers = await ChatMember.findAll();
        res.status(200).json(chatMembers);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.createChatMember = async (req, res) => {

    try {
        const newChatMember = await ChatMember.create(req.body);
        res.status(201).json(newChatMember);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.getChatMemberById = async (req, res) => {
    try {
        const chatMember = await ChatMember.findByPk(req.params.id);
        if (!chatMember) {
            res.status(404).json({ error: 'Chat member not found' });
        } else {
            res.status(200).json(chatMember);
        }
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.updateChatMemberById = async (req, res) => {
    try {
        const updatedChatMember = await ChatMember.update(req.body, {
            where: { id: req.params.id },
        });
        if (updatedChatMember[0] === 0) {
            res.status(404).json({ error: 'Chat member not found' });
        } else {
            res.status(200).json({ message: 'Chat member updated' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.deleteChatMemberById = async (req, res) => {
    try {
        const deletedChatMember = await ChatMember.destroy({ where: { id: req.params.id } });
        if (deletedChatMember === 0) {
            res.status(404).json({ error: 'Chat member not found' });
        } else {
            res.status(200).json({ message: 'Chat member deleted' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};
