const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.get('/search', authMiddleware, userController.searchUsers);
router.get('/filter', authMiddleware, userController.filterUsers);
router.get('/:id', userController.getUserById);
router.delete('/:id', authMiddleware, userController.deleteUserById);
router.put('/:id', authMiddleware, userController.updateUser);


module.exports = router;
