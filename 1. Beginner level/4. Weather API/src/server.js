require('dotenv').config();
const express = require('express');
const weatherRoutes = require('./routes/weather');
const { connectCache } = require('./services/cacheService');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

//routes
app.use('weather', weatherRoutes);

//health Check
app.get('/', (req, res) => {
    res.json({status : 'Weather API Running'});
});

//404 handler
app.use((req, res) => {
    res.status(404).json({ error: "Route not found"});
});

//global error
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong' });
});

connectCache().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.error('Failed to connect to Redis:', err);
    process.exit(1);
});