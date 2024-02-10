import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { configureExpressApp } from './config/express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { configurePassport } from './config/passport';
import { dotenvExists } from './utils/common/checkDotEnv';
import { logger } from './utils/logger/logger';
import { rootRouter } from './routes/index.routes';
import { connectToDb } from './utils/db/database';
import globalErrorHandler from './controllers/v1/error.controller';
import AppError from './utils/common/error/AppError';

const app = express();
const windowMs = 15 * 60 * 1000; //15 minutes

logger.info('Starting application...');

if (!dotenvExists('.env.example')) {
    logger.error('Application will be terminated');
    process.exit(1);
}

if (!process.env.MONGODB_URI) {
    logger.error('Can not find "MONGODB_URI". Application will be terminated');
    process.exit(1);
}

//MongoDB connection
connectToDb(process.env.MONGODB_URI);

//Express Configuration
configurePassport();
configureExpressApp(app, true, windowMs, 100);

app.use(express.json());

app.use('/api', rootRouter);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
    const error = new AppError(
        `Can not find the url ${req.originalUrl} you requested.`,
        404
    );
    next(error);
});

//Error handling
app.use(globalErrorHandler);

//TODO: Add swagger

export { app };
