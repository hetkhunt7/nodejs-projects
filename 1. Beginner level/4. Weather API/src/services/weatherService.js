require('dotenv').config();
const axios = require('axios');
const { setCache, getCache } = require('./cacheService');

const BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

async function getWeather(city) {
    const cacheKey = `weather:${city.toLowerCase()}`;

    const cached = await getCache(cacheKey);
    if(cached) {
        return { ...cached, cached: true} ;
    }

    try {
        const url = `${BASE_URL}/${encodeURIComponent(city)}`;
        const response = await axios.get(url, {
            params : {
                key : process.env.VISUAL_CROSSING_API_KEY,
                unitGroup: 'metric',
                include: 'current',
                contentType: 'json'
            }
        });

        const data = response.data;
        const current = data.currentConditions;

        const weather = {
            city: data.resolvedAddress,
            temperature: current.temp,
            feelsLike: current.feelslike,
            humidity: current.humidity,
            windSpeed: current.windspeed,
            visibility: current.visibility,
            uvIndex: current.uvindex,
            conditions: current.conditions,
            icon: current.icon,
            sunrise: current.sunrise,
            sunset: current.sunset,
            fetchedAt: new Date().toISOString()
        }

        await setCache(cacheKey, weather, 43200);

        return { ...weather, cached: false};
    }
    catch (err) {
        if(err.response) {
            const status = err.response.status;
            if(status == 400) throw new Error(`City: "${city}" not found`);
            if(status == 401) throw new Error('Invalid API key');
            if(status == 429) throw new Error('API rate limit exceeded');
            throw new Error(`Weather API error ${status}`);
        }
        throw new Error('Failed to reach weather sevice. Check your connection');
    }
}

module.exports = { getWeather };