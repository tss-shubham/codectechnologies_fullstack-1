const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const skillController = require('../controllers/skillController');

// Validation middleware
const validateSkill = [
  body('name').notEmpty().withMessage('Skill name is required').trim(),
  body('category').isIn(['Frontend', 'Backend', 'Database', 'DevOps', 'Tools']).withMessage('Invalid category'),
  body('proficiency').isInt({ min: 0, max: 100 }).withMessage('Proficiency must be between 0-100'),
  body('yearsOfExperience').isInt({ min: 0 }).withMessage('Years of experience must be a positive number')
];

// Routes
router.get('/', skillController.getAllSkills);
router.get('/:id', skillController.getSkillById);
router.post('/', validateSkill, skillController.createSkill);
router.put('/:id', validateSkill, skillController.updateSkill);
router.delete('/:id', skillController.deleteSkill);

module.exports = router;
