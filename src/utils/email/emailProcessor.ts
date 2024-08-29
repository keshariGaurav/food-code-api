import { Worker, Job } from 'bullmq';
import Email from '@/utils/email/email';
import redisConfig from '@/config/redisClient';
import { templates } from '@/utils/email/templates';

interface EmailJob {
    templateName: keyof typeof templates;
    to: string;
    data: { [key: string]: string };
}

const emailWorker = new Worker(
    'emailQueue',
    async (job: Job<EmailJob>) => {
        const emailService = new Email();
        const { templateName, to, data } = job.data;
        await emailService.sendTemplatedEmail(templateName, to, data);
    },
    {
        connection: redisConfig,
    }
);

emailWorker.on('completed', (job) => {
    console.log(`Job completed with result ${job.returnvalue}`);
});

emailWorker.on('failed', (job, err) => {
    console.error(`Job failed with error ${err.message}`);
});

export default emailWorker;
