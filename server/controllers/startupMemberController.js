const { StartupMember } = require('../models');

exports.getAllStartupMembers = async (req, res) => {
    try {
        const startupMembers = await StartupMember.findAll();
        res.status(200).json(startupMembers);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.createStartupMember = async (req, res) => {
    try {
        const newStartupMember = await StartupMember.create(req.body);
        res.status(201).json(newStartupMember);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.getStartupMemberById = async (req, res) => {
    try {
        const startupMember = await StartupMember.findByPk(req.params.id);
        if (!startupMember) {
            res.status(404).json({ error: 'Startup member not found' });
        } else {
            res.status(200).json(startupMember);
        }
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.updateStartupMemberById = async (req, res) => {
    try {
        const updatedStartupMember = await StartupMember.update(req.body, {
            where: { id: req.params.id },
        });

        if (updatedStartupMember[0] === 0) {
            res.status(404).json({ error: 'Startup member not found' });
        } else {
            res.status(200).json({ message: 'Startup member updated' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.deleteStartupMemberById = async (req, res) => {
    try {
        const deletedStartupMember = await StartupMember.destroy({ where: { id: req.params.id } });
        if (deletedStartupMember === 0) {
            res.status(404).json({ error: 'Startup member not found' });
        } else {
            res.status(200).json({ message: 'Startup member deleted' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};