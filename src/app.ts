import express from 'express';
import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import session from 'express-session';
import { Server as SocketIOServer } from 'socket.io';
import http from 'http';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import { configurePassport } from '@/config/passport';
import { configureExpressApp } from '@/config/express';
import { dotenvExists } from '@/utils/common/checkDotEnv';
import { logger } from '@/utils/logger/logger';
import { rootRouter } from '@/routes/index.routes';
import { connectToDb } from '@/utils/db/database';
import globalErrorHandler from '@/controllers/v1/error.controller';
import AppError from '@/utils/common/error/AppError';

import Order from '@/models/order.model';
const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
    },
});
const windowMs = 15 * 60 * 1000; //15 minutes

logger.info('Starting application...');

if (!dotenvExists('.env')) {
    logger.error('Application will be terminated...');
    process.exit(1);
}

if (!process.env.MONGODB_URI) {
    logger.error('Can not find "MONGODB_URI". Application will be terminated');
    process.exit(1);
}

//MongoDB connection
connectToDb(process.env.MONGODB_URI);

app.use(
    session({
        secret: process.env.SESSION_SECRET || 'keyboard cat',
        resave: false,
        saveUninitialized: true,
    })
);

app.use(passport.initialize());
app.use(passport.session());

//Express Configuration
configurePassport();
configureExpressApp(app, true, windowMs, 100);

app.use(express.json());

app.use('/api', rootRouter);
io.on('connection', async (socket) => {
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
const OrderStream = Order.watch([
    { $match: { operationType: { $in: ['insert'] } } },
]);

OrderStream.on('change', async (change) => {
    if (change.operationType === 'insert') {
        const orderId = change.fullDocument._id;
        const populatedOrder = await Order.findById(orderId)
            .populate({
                path: 'menuItems.menuItemId',
                model: 'MenuItem',
            })
            .populate('dinerId');

        if (populatedOrder) {
            io.emit('orderCreated', populatedOrder);
            console.log('emitted');
        }
    }
});

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

export { app, server };
