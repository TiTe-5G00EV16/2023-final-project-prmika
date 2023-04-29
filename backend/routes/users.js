const express = require('express');
const router = express.Router();

const { loginUser, signUpUser, getUsers, resetPassword } = require('../controllers/users');

router.get('/',getUsers);
router.post('/signup', signUpUser);
router.post('/login', loginUser);
router.post('/reset', resetPassword);

module.exports = router;