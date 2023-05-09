const express = require('express');
const messageController = require('../controllers/messageController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/:chatId/messages', authMiddleware, messageController.create);
router.get('/:chatId/messages', authMiddleware, messageController.list);

module.exports = router;
