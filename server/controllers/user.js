const express = require("express");
const { register, login, logout ,userDetails,verifyEmail } = require("../services/user");
const { body, validationResult } = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware");
const {resendVerificationEmail} = require("../utils/mail");

const router = express.Router();

// Validation middleware
const validateRegister = [
    body("username").trim().notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
];

// Register route with validation middleware
router.post("/register", validateRegister, register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/user-details",authMiddleware,userDetails);
router.post("/resend-verification-email",authMiddleware,resendVerificationEmail);
router.get("/verify-email/:userId/:token",verifyEmail);
module.exports = router;
