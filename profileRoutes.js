const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const profileController = require('../controllers/profileController');

// Validation middleware
const validateProfile = [
  body('name').optional().trim(),
  body('email').optional().isEmail().withMessage('Valid email is required'),
  body('phone').optional().trim(),
  body('location').optional().trim(),
  body('bio').optional().trim(),
  body('resumeLink').optional().isURL().withMessage('Resume link must be a valid URL'),
  body('socialLinks.github').optional().isURL().withMessage('GitHub link must be a valid URL'),
  body('socialLinks.linkedin').optional().isURL().withMessage('LinkedIn link must be a valid URL'),
  body('socialLinks.twitter').optional().isURL().withMessage('Twitter link must be a valid URL')
];

// Routes
router.get('/', profileController.getProfile);
router.put('/', validateProfile, profileController.updateProfile);

module.exports = router;
