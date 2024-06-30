import jwt, { TokenExpiredError } from 'jsonwebtoken';
import crypto from 'crypto';
import Diner, { IDiner } from '../../models/diner.model';
import catchAsync from '../../utils/common/error/catchAsync';
import sendEmail from '../../utils/email/email';
import AppError from '../../utils/common/error/AppError';
import { Request, Response, NextFunction } from 'express';

interface User {
    email: string;
}

interface RequestWithUser extends Request {
    user?: User;
}

const signToken = (id: string, expiresIn?: string): string => {
    return jwt.sign({ id }, process.env.JWT_SECRET!, {
        expiresIn: expiresIn ? expiresIn : process.env.JWT_EXPIRES_IN,
    });
};

const createSendToken = (diner: IDiner, statusCode: number, res: Response) => {
    const token = signToken(diner._id);
    const cookieOptions = {
        httpOnly: true,
        secure: false,
        path: '/',
        maxAge: 999999999,
    };

    // if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    res.cookie('jwt', token, cookieOptions);
    diner.otp = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            diner,
        },
    });
};
const createAndReturnToken = (
    diner: IDiner,
    statusCode: number,
    res: Response
) => {
    const token = signToken(diner._id);
    const cookieOptions = {
        httpOnly: true,
        secure: false,
        path: '/',
        maxAge: 999999999,
    };

    // if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    res.cookie('jwt', token, cookieOptions);
    diner.otp = undefined;

    res.redirect('http://localhost:5173');
};

export const sendLoginOtp = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { email } = req.body;

        if (!email) {
            return next(new AppError('Please provide email', 400));
        }

        let diner = await Diner.findOne({ email });
        let resetToken;

        if (!diner) {
            const name = email.split('@')[0];
            diner = await Diner.create({ email, name });
            resetToken = diner.createOtpToken();
        } else {
            resetToken = diner.createOtpToken();
        }
        await diner.save();

        try {
            await sendEmail({
                email: diner.email,
                subject: 'Your Password Reset Token (valid for 10 mins)',
                message: `Please Enter the OTP to get logged in.The OTP is ${resetToken}`,
            });
            res.status(200).json({
                status: 'Success',
                message: 'Token sent to email!.',
            });
        } catch (err) {
            diner.otp = undefined;
            diner.otpExpirationTime = undefined;
            await diner.save({ validateBeforeSave: false });
            return next(
                new AppError(
                    'There was an error sending the email. Please try again later.',
                    500
                )
            );
        }
    }
);

export const login = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return next(new AppError('Please provide email and OTP', 400));
        }
        const hashedToken = crypto
            .createHash('sha256')
            .update(otp)
            .digest('hex');

        const diner = await Diner.findOne({ email, otp: hashedToken });

        if (!diner) {
            return next(new AppError('Incorrect OTP!', 400));
        }
        diner.otp = undefined;
        diner.otpExpirationTime = undefined;
        await diner.save();

        createSendToken(diner, 200, res);
    }
);

export const authCallback = catchAsync(
    async (req: RequestWithUser, res: Response, next: NextFunction) => {
        const email = req.user.email;
        const diner = await Diner.findOne({ email });
        if (!diner) {
            return next(new AppError('No Email found!', 400));
        }
        createAndReturnToken(diner, 200, res);
    }
);

export const createGuest = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        let { name } = req.body;
        name = name ?? 'Guest User';
        const diner = await Diner.create({ name, role: 'guest' });

        createSendToken(diner, 200, res);
    }
);

export const protect = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        let token: string | undefined;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies.jwt) {
            token = req.cookies.jwt;
        }

        if (!token) {
            return next(
                new AppError(
                    'You are not logged in! Please login to get access.',
                    401
                )
            );
        }
        try {
            const decoded = await new Promise<{ id: string; iat: number }>(
                (resolve, reject) => {
                    jwt.verify(
                        token!,
                        process.env.JWT_SECRET,
                        (error, decoded) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(decoded as { id: string; iat: number });
                            }
                        }
                    );
                }
            );
            const user = await Diner.findById(decoded.id);
            if (!user) {
                return next(new AppError('The user no longer exists', 401));
            }
            req.user = user;
            next();
        } catch (error) {
            return next(new AppError('Invalid token', 401));
        }
    }
);
