const axios = require('axios');
const { setCache, getCache } = require('./cacheService');

const BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

async function getWeather(city) {
    const cacheKey = `weather:${city.toLowerCase()}`;

    const cached = await getCache(cacheKey);
    if(cached) {
        return { ...cached, cached: true} ;
    }

    //
}