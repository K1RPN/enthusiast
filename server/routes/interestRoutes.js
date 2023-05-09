const express = require('express');
const router = express.Router();
const interestController = require('../controllers/interestController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/add-interests',  interestController.addInterests);

module.exports = router;
