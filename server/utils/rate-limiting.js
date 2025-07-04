const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // Limit each IP to 10 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes',
});

module.exports = limiter;