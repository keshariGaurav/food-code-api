import { connect, ConnectOptions } from 'mongoose';
import { logger } from '@/utils/logger/logger';

const options: ConnectOptions = {
    autoIndex: true,
    maxPoolSize: 10, // Maintain up to 10 socket connections
    // See https://mongoosejs.com/docs/connections.html for more options
};

const connectToDb = (uri: string) => {
    logger.info('Trying to connect to database');
    connect(uri, options)
        .then(() => {
            logger.info('Database connected successfully');
        })
        .catch((error) => {
            logger.error(
                'Database was not connected successfully.\n' + error?.message
            );
            logger.error('Application will be terminated');
            process.exit(1);
        });
};

export { connectToDb };
