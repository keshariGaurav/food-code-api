import { Request, Response, NextFunction } from 'express';
import redisClient from '@/config/redisClient';
import {
    generateCacheKey,
    invalidateCache,
    tagCacheEntry,
} from '@/utils/cache/cacheUtils';

interface CustomResponse extends Response {
    sendResponse?: (body: any) => Response;
}

const cacheMiddleware =
    (tags: string[]) =>
    async (req: Request, res: CustomResponse, next: NextFunction) => {
        const key = generateCacheKey(req);

        try {
            const cachedData = await redisClient.get(key);

            if (cachedData) {
                return res.send(JSON.parse(cachedData));
            }

            res.sendResponse = res.send.bind(res);
            res.send = (body) => {
                redisClient.set(key, JSON.stringify(body), 'EX', 3600);
                tagCacheEntry(key, tags);
                return res.sendResponse!(body);
            };

            next();
        } catch (error) {
            console.error('Redis error:', error);
            next();
        }
    };

export default cacheMiddleware;
