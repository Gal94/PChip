const express = require('express');
const { check } = require('express-validator');

const poweruserController = require('../controllers/poweruserController');

const router = express.Router();

router.post(
  '/login',
  [
    check('email').normalizeEmail().isEmail(),
    check('password').not().isEmpty().isLength({ min: 6 }),
  ],
  poweruserController.postLogin
);
router.post('/reset', poweruserController.postReset);
router.get('/confirm', poweruserController.getIsLoggedIn);
router.post('/newPassword', poweruserController.postNewPass);
router.get('/:token', poweruserController.getNewPass);
module.exports = router;
