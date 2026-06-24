const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide skill name'],
    trim: true,
    maxlength: 50
  },
  category: {
    type: String,
    required: true,
    enum: ['Frontend', 'Backend', 'Database', 'DevOps', 'Tools'],
    default: 'Frontend'
  },
  proficiency: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  yearsOfExperience: {
    type: Number,
    required: true,
    default: 1
  },
  icon: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);
