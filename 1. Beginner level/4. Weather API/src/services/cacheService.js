const redis = require('redis');

const client = redis.createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379",
    socket: {
    reconnectStrategy: (retries) => Math.min(retries * 50, 2000)
  },
  RESP: 2
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
    await connectCache();
    const data = await client.get(key);
    if (!data) return null;
    
    // data might be double-stringified, handle both cases
    const parsed = JSON.parse(data);
    if (typeof parsed === 'string') {
      return JSON.parse(parsed); // parse again if still a string
    }
    return parsed;
  } catch (err) {
    console.error('Cache get error:', err.message);
    return null;
  }
}

async function setCache(key, value, expirySeconds = 43200) {
  try {
    await connectCache();
    // value should be an object, stringify once
    const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
    await client.set(key, stringValue);
    await client.expire(key, expirySeconds);
  } catch (err) {
    console.error('Cache set error:', err.message);
  }
}

module.exports = { connectCache, getCache, setCache };