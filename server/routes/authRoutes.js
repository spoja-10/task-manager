const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { protect } = require('../middleware/auth');
const { register, login, getMe } = require('../controllers/authController');

router.post('/register', [
  body('name').notEmpty().trim().isLength({ max: 50 }),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 })
], register);

router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
], login);

router.get('/me', protect, getMe);

module.exports = router;
