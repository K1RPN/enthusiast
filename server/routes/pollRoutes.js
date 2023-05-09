const express = require('express');
const pollController = require('../controllers/pollController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/:chatId/polls', authMiddleware, pollController.create);
router.get('/:chatId/polls', authMiddleware, pollController.list);
router.post('/options/:optionId/vote', authMiddleware, pollController.vote);

module.exports = router;
