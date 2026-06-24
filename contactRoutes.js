const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const contactController = require('../controllers/contactController');

// Validation middleware
const validateContact = [
  body('name').notEmpty().withMessage('Name is required').trim(),
  body('email').isEmail().withMessage('Valid email is required'),
  body('subject').notEmpty().withMessage('Subject is required').trim(),
  body('message').notEmpty().withMessage('Message is required').trim().isLength({ min: 10 }).withMessage('Message must be at least 10 characters'),
  body('phone').optional().trim()
];

// Routes
router.get('/', contactController.getAllMessages);
router.post('/', validateContact, contactController.createMessage);
router.patch('/:id/status', contactController.updateMessageStatus);
router.delete('/:id', contactController.deleteMessage);

module.exports = router;
