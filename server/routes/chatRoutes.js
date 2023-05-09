const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', chatController.getAllChats);
router.post('/', authMiddleware, chatController.createChat);
router.get('/:id', chatController.getChatById);
router.put('/:id', authMiddleware, chatController.updateChatById);
router.delete('/:id', authMiddleware, chatController.deleteChatById);

module.exports = router;
