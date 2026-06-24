const nodemailer = require('nodemailer');

const emailConfig = {
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
};

const transporter = nodemailer.createTransport(emailConfig);

const sendEmail = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✓ Email sent: ${info.response}`);
    return info;
  } catch (error) {
    console.error('✗ Email send error:', error);
    throw error;
  }
};

module.exports = { sendEmail };
