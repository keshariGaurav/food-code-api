import { Queue, Worker } from 'bullmq';
import redisConnection from './../config/redisClient';


const mailServiceQueue = new Queue('emailQueue', {
    connection: redisConnection,
});

export default mailServiceQueue;
