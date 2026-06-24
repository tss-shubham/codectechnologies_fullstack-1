const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide project title'],
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: [true, 'Please provide project description'],
    maxlength: 1000
  },
  image: {
    type: String,
    default: null
  },
  technologies: [String],
  liveLink: {
    type: String,
    default: null
  },
  githubLink: {
    type: String,
    default: null
  },
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
