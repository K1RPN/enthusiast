const express = require('express');
const router = express.Router();
const chatMemberController = require('../controllers/chatMemberController');

router.get('/', chatMemberController.getAllChatMembers);
router.post('/', chatMemberController.createChatMember);
router.get('/:id', chatMemberController.getChatMemberById);
router.put('/:id', chatMemberController.updateChatMemberById);
router.delete('/:id', chatMemberController.deleteChatMemberById);

module.exports = router;
