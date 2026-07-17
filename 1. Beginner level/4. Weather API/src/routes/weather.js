const express = require('express');
const router = express.Router();
const { getWeather } = require('../services/weatherService');
const { strictLimiter } = require('../middleware/rateLimiter');

router.use(strictLimiter);

router.get('/', async (req, res) => {
    const { city } = req.query;

    if(!city || city.trim() === '') {
        res.status(400).json({
            error: 'City is required. Usage: /weather?city=London'
        });
    }

    try {
        const weather = await getWeather(city.trim());
        return res.status(200).json(weather);
    }
    catch (err) {
        const message = err.message || 'Something went wrong.';
        
        if(message.includes('not found')) return res.status(404).json({ error : message});
        if(message.includes('Invalid API Key')) return res.status(401).json({ error : message });
        if(message.includes('rate limit')) return res.status(429).jon({ error: message });

        return res.status(500).json({ error: message });
    }
});

module.exports = router;