const express = require('express');
const router = express.Router();
const startupController = require('../controllers/startupController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', startupController.getAllStartups);
router.post('/', authMiddleware,  startupController.createStartup);
router.get('/:id', startupController.getStartupById);
router.put('/:id', authMiddleware, startupController.updateStartupById);
router.delete('/:id', authMiddleware, startupController.deleteStartupById);
router.post('/:startupId/members', async (req, res) => {
    try {
        const { startupId } = req.params;
        const { email } = req.body;
        // ...логика добавления участника по email...
        res.status(201).json(newMember);
    } catch (error) {
        res.status(500).json({ message: 'Error adding member.' });
    }
});
router.delete('/:startupId/members/:memberId', async (req, res) => {
    try {
        const { startupId, memberId } = req.params;
        // ...логика удаления участника из стартапа...
        res.status(200).json({ message: 'Member removed successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing member.' });
    }
});
module.exports = router;
