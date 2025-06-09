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
                <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; text-align: center;">
                    <div style="max-width: 500px; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); margin: auto;">
                        <h2 style="color: #1e3a8a;">Hello ${user.username || 'there'},</h2>
                        <p style="font-size: 16px; color: #333;">Thank you for signing up! Please click the button below to verify your email:</p>
                        <a href="${link}" 
                        style="display: inline-block; padding: 12px 20px; background-color: #3b82f6; color: white; 
                                text-decoration: none; font-size: 16px; border-radius: 5px; margin-top: 10px;">
                        Verify Email
                        </a>
                        <p style="font-size: 14px; color: #555; margin-top: 10px;">Or copy this link into your browser:</p>
                        <p style="word-break: break-all; font-size: 14px; color: #888;">${link}</p>
                        <p style="font-size: 14px; color: #888; margin-top: 10px;">This link expires in 1 hour.</p>
                    </div>
                </div>
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
        //console.log("req.user.isVerified",req.user.isVerified);
        if (req.user.isVerified) {
            return res.status(400).json({
                message: 'User already verified.'
            });
        }

        await sendVerificationEmail(req.user);
        res.status(200).json({
            success: true,
            message: 'Verification email sent again.'
        });
    } catch (err) {
        //console.error('Email sending error:', err);
        res.status(500).json({
            successs: false,
            message: 'Error sending email.',
            error: process.env.NODE_ENV === 'development' ? err.message : null
        });
    }
}

module.exports = {
    sendVerificationEmail,
    resendVerificationEmail
};