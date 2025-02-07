const express = require("express");
const { register, login } = require("../services/user");
const { body, validationResult } = require("express-validator");

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

module.exports = router;
