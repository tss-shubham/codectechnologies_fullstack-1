const Contact = require('../models/Contact');
const { validationResult } = require('express-validator');
const { sendEmail } = require('../config/email');

// Get all contact messages
exports.getAllMessages = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};

    const messages = await Contact.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Create contact message
exports.createMessage = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const contact = await Contact.create(req.body);

    // Send confirmation email to visitor
    try {
      await sendEmail(
        contact.email,
        'We received your message',
        `<p>Hello ${contact.name},</p>
         <p>Thank you for reaching out! We have received your message and will get back to you soon.</p>
         <p>Best regards,<br/>Your Portfolio Team</p>`
      );

      // Send notification email to portfolio owner
      await sendEmail(
        process.env.EMAIL_USER,
        `New Contact Message from ${contact.name}`,
        `<p><strong>From:</strong> ${contact.name}</p>
         <p><strong>Email:</strong> ${contact.email}</p>
         <p><strong>Phone:</strong> ${contact.phone || 'Not provided'}</p>
         <p><strong>Subject:</strong> ${contact.subject}</p>
         <p><strong>Message:</strong></p>
         <p>${contact.message}</p>`
      );
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Continue even if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Update message status
exports.updateMessageStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!['new', 'read', 'replied'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status'
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Message not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Message status updated',
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Delete message
exports.deleteMessage = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Message not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
