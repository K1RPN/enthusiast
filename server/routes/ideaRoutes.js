const express = require('express');
const ideaController = require('../controllers/ideaController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/ideas', authMiddleware, ideaController.getIdeas);
router.post('/ideas/vote', authMiddleware, ideaController.voteIdea);

module.exports = router;
