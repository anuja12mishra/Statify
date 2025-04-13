require('dotenv').config();
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const EmailVerificationToken = require('../models/email');

const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false, // true for port 465
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    },
});

async function sendVerificationEmail(user) {
    try {
        const token = crypto.randomBytes(32).toString('hex');

        const verification = new EmailVerificationToken({
            userId: user._id,
            token,
            expiresAt: new Date(Date.now() + 3600000) // 1 hour
        });

        await verification.save();

        const link = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/verify-email/${user._id}/${token}`;

        const mailOptions = {
            from: `"Your App" <${process.env.SENDER_EMAIL || process.env.SMTP_USER}>`,
            to: user.email,
            subject: 'Verify Your Email',
            html: `
                <p>Hello ${user.username || 'there'},</p>
                <p>Please click below to verify your email:</p>
                <p><a href="${link}">Verify Email</a></p>
                <p>Or copy this link: ${link}</p>
                <p>This link expires in 1 hour.</p>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        //console.log('Email sent:', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending verification email:', error);
        throw error;
    }
}

async function resendVerificationEmail(req, res) {
    try {
        console.log("req.user.isVerified",req.user.isVerified);
        if (req.user.isVerified) {
            return res.status(400).json({ message: 'User already verified.' });
        }

        await sendVerificationEmail(req.user);
        res.json({ success:true,message: 'Verification email sent again.' });
    } catch (err) {
        console.error('Email sending error:', err);
        res.status(500).json({
            successs:false, 
            message: 'Error sending email.',
            error: process.env.NODE_ENV === 'development' ? err.message : null
        });
    }
}

module.exports = {
    sendVerificationEmail,
    resendVerificationEmail
};