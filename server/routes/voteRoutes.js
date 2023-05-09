const express = require('express');
const router = express.Router();
const voteController = require('../controllers/voteController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', voteController.getAllVotes);
router.post('/', authMiddleware, voteController.createVote);
router.get('/:id', voteController.getVoteById);
router.put('/:id', authMiddleware, voteController.updateVoteById);
router.delete('/:id', authMiddleware, voteController.deleteVoteById);

module.exports = router;
