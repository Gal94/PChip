const express = require('express');
const router = express.Router();

const fileUpload = require('../middleware/file-upload');
const membersController = require('../controllers/members-contoller');

router.get('/', membersController.getMembers);
router.post('/', fileUpload.single('image'), membersController.postMember);
router.delete('/:pid', membersController.deleteMember);

module.exports = router;
