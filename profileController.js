const Profile = require('../models/Profile');
const { validationResult } = require('express-validator');

// Get profile
exports.getProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();

    if (!profile) {
      // Create default profile if doesn't exist
      profile = await Profile.create({
        name: 'Your Name',
        email: 'your.email@example.com'
      });
    }

    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Update profile
exports.updateProfile = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    let profile = await Profile.findOne();

    if (!profile) {
      profile = await Profile.create(req.body);
    } else {
      profile = await Profile.findByIdAndUpdate(
        profile._id,
        { ...req.body, updatedAt: Date.now() },
        { new: true, runValidators: true }
      );
    }

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: profile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
