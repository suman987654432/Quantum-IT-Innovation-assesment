const express = require('express');
const { signupUser, signinUser } = require('../controllers/userController');

const router = express.Router();

// POST /api/users/signup
router.post('/signup', signupUser);

// POST /api/users/signin
router.post('/signin', signinUser);

module.exports = router;
