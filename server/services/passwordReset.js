// controllers/passwordReset.js
require('dotenv').config();
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const ResetPasswordOtp = require('../models/reset-pass');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    },
});

async function sendPasswordResetEmail(req, res) {
    try {
        const email = req.user.email;
        
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000);
        
        // Set expiration to 15 minutes from now
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

        // Delete any existing OTP for this user
        await ResetPasswordOtp.deleteMany({ userId: user._id });

        // Create new OTP record
        const otpRecord = new ResetPasswordOtp({
            userId: user._id,
            otp,
            expiresAt
        });

        await otpRecord.save();

        // Send email with OTP
        const mailOptions = {
            from: `"Your App" <${process.env.SENDER_EMAIL || process.env.SMTP_USER}>`,
            to: user.email,
            subject: 'Password Reset OTP',
            html: `
                <p>Hello ${user.username || 'there'},</p>
                <p>Your OTP for password reset is: <strong>${otp}</strong></p>
                <p>This OTP is valid for 15 minutes.</p>
                <p>If you didn't request this, please ignore this email.</p>
            `
        };

        await transporter.sendMail(mailOptions);
        
        res.json({ 
            success: true, 
            message: 'OTP sent to email',
            userId: user._id // Send userId to client for verification step
        });
    } catch (error) {
        console.error('Error in password reset:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error processing password reset',
            error: process.env.NODE_ENV === 'development' ? error.message : null
        });
    }
}

async function verifyOtpAndResetPassword(req, res) {
    console.log("verifyOtpAndResetPassword called ..........................");
    try {
        const { otp, newPassword } = req.body;
        
        // First, find the user from the request (assuming you have auth middleware)
        const user = req.user; // This should be set by your auth middleware
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Find the OTP record
        const otpRecord = await ResetPasswordOtp.findOne({ 
            userId: user._id,
            otp
        });

        if (!otpRecord) {
            return res.status(400).json({ success: false, message: 'Invalid OTP' });
        }

        // Check if OTP is expired
        if (otpRecord.expiresAt < new Date()) {
            await ResetPasswordOtp.deleteOne({ _id: otpRecord._id });
            return res.status(400).json({ success: false, message: 'OTP has expired' });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update user password
        user.password = hashedPassword;
        await user.save();

        // Delete the used OTP
        await ResetPasswordOtp.deleteOne({ _id: otpRecord._id });

        res.json({ 
            success: true, 
            message: 'Password reset successfully' 
        });
    } catch (error) {
        console.error('Error in password reset verification:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error resetting password',
            error: process.env.NODE_ENV === 'development' ? error.message : null
        });
    }
}

module.exports = {
    sendPasswordResetEmail,
    verifyOtpAndResetPassword
};