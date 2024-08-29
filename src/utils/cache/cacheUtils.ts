import { Request } from 'express';
import redisClient from '@/config/redisClient';

const generateCacheKey = (req: Request): string => {
    const { method, originalUrl, query, params } = req;
    const keyBase = `${method}:${originalUrl}`;
    const queryParams = JSON.stringify(query);
    const pathParams = JSON.stringify(params);
    return `${keyBase}?query=${queryParams}&params=${pathParams}`;
};

const invalidateCache = async (key: string) => {
    try {
        await redisClient.del(key);
        console.log(`Cache invalidated for key: ${key}`);
    } catch (error) {
        console.error('Error invalidating cache:', error);
    }
};

const tagCacheEntry = async (key: string, tags: string[]) => {
    for (const tag of tags) {
        await redisClient.sadd(tag, key);
    }
};

const invalidateCacheByTag = async (tag: string) => {
    try {
        const keys = await redisClient.smembers(tag);
        if (keys.length > 0) {
            await redisClient.del(...keys);
            await redisClient.del(tag); // Remove the tag set itself
            console.log(`Cache invalidated for tag: ${tag}`);
        }
    } catch (error) {
        console.error('Error invalidating cache by tag:', error);
    }
};

export {
    generateCacheKey,
    invalidateCache,
    tagCacheEntry,
    invalidateCacheByTag,
};
