const express = require('express');
const router = express.Router();
const ideaRatingController = require('../controllers/ideaRatingController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', ideaRatingController.getAllIdeaRatings);
router.post('/', authMiddleware, ideaRatingController.createIdeaRating);
router.get('/:id', ideaRatingController.getIdeaRatingById);
router.put('/:id', authMiddleware, ideaRatingController.updateIdeaRatingById);
router.delete('/:id', authMiddleware, ideaRatingController.deleteIdeaRatingById);

module.exports = router;
