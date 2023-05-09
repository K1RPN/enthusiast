const express = require('express');
const router = express.Router();
const voteOptionController = require('../controllers/voteOptionController');

router.get('/', voteOptionController.getAllVoteOptions);
router.post('/', voteOptionController.createVoteOption);
router.get('/:id', voteOptionController.getVoteOptionById);
router.put('/:id', voteOptionController.updateVoteOptionById);
router.delete('/:id', voteOptionController.deleteVoteOptionById);

module.exports = router;
