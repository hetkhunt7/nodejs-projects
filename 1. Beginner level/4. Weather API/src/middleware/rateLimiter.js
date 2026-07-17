const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        error: "Too many requests. Please try again after 15 minutes."
    }
});

const strictLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 10,
    message: {
        error: "Too many requests. Please slow down."
    }
});

module.exports = { limiter, strictLimiter };