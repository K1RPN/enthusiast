const express = require('express');
const router = express.Router();
const userVoteController = require('../controllers/userVoteController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', userVoteController.getAllUserVotes);
router.post('/', authMiddleware, userVoteController.createUserVote);
router.get('/:id', userVoteController.getUserVoteById);
router.put('/:id', authMiddleware, userVoteController.updateUserVoteById);
router.delete('/:id', authMiddleware, userVoteController.deleteUserVoteById);

module.exports = router;
