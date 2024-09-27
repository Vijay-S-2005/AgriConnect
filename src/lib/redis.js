// lib/redis.js
import Redis from 'ioredis';

let redis;

if (!redis) {
  redis = new Redis({
    host: process.env.REDIS_HOST,   // Redis server host
    port: process.env.REDIS_PORT,   // Redis server port
    password: process.env.REDIS_PASSWORD, // Optional: if Redis is protected with a password
  });
}

export default redis;
