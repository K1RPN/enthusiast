const express = require('express');
const router = express.Router();
const friendshipController = require('../controllers/friendshipController');

router.get('/', friendshipController.getAllFriendships);
router.post('/', friendshipController.createFriendship);
router.get('/:id', friendshipController.getFriendshipById);
router.put('/:id', friendshipController.updateFriendshipById);
router.delete('/:id', friendshipController.deleteFriendshipById);

module.exports = router;
