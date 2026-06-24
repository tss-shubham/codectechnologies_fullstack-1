const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const projectController = require('../controllers/projectController');

// Validation middleware
const validateProject = [
  body('title').notEmpty().withMessage('Title is required').trim(),
  body('description').notEmpty().withMessage('Description is required').trim(),
  body('technologies').isArray().withMessage('Technologies must be an array'),
  body('liveLink').optional().isURL().withMessage('Live link must be a valid URL'),
  body('githubLink').optional().isURL().withMessage('GitHub link must be a valid URL')
];

// Routes
router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);
router.post('/', validateProject, projectController.createProject);
router.put('/:id', validateProject, projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

module.exports = router;
