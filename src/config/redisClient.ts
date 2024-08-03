import Redis from 'ioredis';
import { REDIS_HOST,REDIS_PASSWORD,REDIS_PORT } from '../utils/envConstants';

const redisClient = new Redis({
    host: REDIS_HOST,
    port: REDIS_PORT,
    password: REDIS_PASSWORD,
    maxRetriesPerRequest: null,
    // tls: {},
});

redisClient.on('error', (err) => console.error('Redis Client Error',process.env.REDIS_PASSWORD, err));
redisClient.on('connect', () => console.log('Connected to Redis server'));
redisClient.on('ready', () => console.log('Redis client is ready'));


export default redisClient;
