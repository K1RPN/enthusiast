const express = require('express');
const router = express.Router();
const startupMemberController = require('../controllers/startupMemberController');

router.get('/', startupMemberController.getAllStartupMembers);
router.post('/', startupMemberController.createStartupMember);
router.get('/:id', startupMemberController.getStartupMemberById);
router.put('/:id', startupMemberController.updateStartupMemberById);
router.delete('/:id', startupMemberController.deleteStartupMemberById);

module.exports = router;
