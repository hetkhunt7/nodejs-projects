const redis = require('redis');

const client = redis.createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379"
});

client.on('connect', () => console.log("Connected to Redis"));
client.on('error', (err) => console.error("Redis error ", err));

async function connectCache() {
    if(!client.isOpen) {
        await client.connect();
    }
}

async function getCache(key) {
    try {
        await client.connectCache();
        const data = await client.get(key);
        return data ? JSON.stringify(data) : null;
    }
    catch (err){
        console.error('cache get error', err);
        return null;
    }
}

async function setCache(key, value, ExpirySeconds = 43200) {
    try {
        await client.connectCache();
        await client.set(key, value, { EX : ExpirySeconds });
    }
    catch (err) {
        console.error('Cache set error', err);
    }
}

module.exports = { connectCache, getCache, setCache };