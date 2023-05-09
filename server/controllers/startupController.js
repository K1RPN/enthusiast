const { Startup } = require('../models');

exports.getAllStartups = async (req, res) => {
    try {
        const startups = await Startup.findAll();
        res.status(200).json(startups);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.createStartup = async (req, res) => {
    try {
        const newStartup = await Startup.create(req.body);
        res.status(201).json(newStartup);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.getStartupById = async (req, res) => {
    try {
        const startup = await Startup.findByPk(req.params.id);
        if (!startup) {
            res.status(404).json({ error: 'Startup not found' });
        } else {
            res.status(200).json(startup);
        }
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.updateStartupById = async (req, res) => {
    try {
        const updatedStartup = await Startup.update(req.body, {
            where: { id: req.params.id
            },
        });

        if (updatedStartup[0] === 0) {
            res.status(404).json({ error: 'Startup not found' });
        } else {
            res.status(200).json({ message: 'Startup updated' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.deleteStartupById = async (req, res) => {
    try {
        const deletedStartup = await Startup.destroy({ where: { id: req.params.id } });
        if (deletedStartup === 0) {
            res.status(404).json({ error: 'Startup not found' });
        } else {
            res.status(200).json({ message: 'Startup deleted' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};