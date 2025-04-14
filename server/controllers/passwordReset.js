// routes/passwordReset.js
const express = require('express');
const authMiddleware = require("../middleware/authMiddleware");
const { 
    sendPasswordResetEmail, 
    verifyOtpAndResetPassword 
} = require('../services/passwordReset');

const router = require("express").Router();
// Route to send password reset OTP
router.post('/send-reset-otp', authMiddleware,sendPasswordResetEmail);

// Route to verify OTP and set new password
router.post('/verify-reset-otp',authMiddleware, verifyOtpAndResetPassword);

module.exports = router;