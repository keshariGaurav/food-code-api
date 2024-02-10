import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import Cafe,{ICafe} from '../../models/cafe.model';
import catchAsync from '../../utils/common/error/catchAsync';
import sendEmail from '../..//utils/email/email';
import AppError from '../..//utils/common/error/AppError';
import { Request, Response, NextFunction } from 'express';

const signToken = (id: string, expiresIn?: string): string => {
    return jwt.sign({ id }, process.env.JWT_SECRET!, {
        expiresIn: expiresIn?expiresIn:process.env.JWT_EXPIRES_IN,
    });
};

const createSendToken = (cafe: ICafe, statusCode: number, res: Response) => {
    const token = signToken(cafe._id);
    const cookieOptions = {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 90 days
        httpOnly: true,
        secure:false,
    };

    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    res.cookie('jwt', token, cookieOptions);
    cafe.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            cafe,
        },
    });
};

const createSendPasswordResetToken = async (
    req: Request,
    user: ICafe,
    statusCode: number,
    res: Response,
    email: string,
    next: NextFunction
) => {
    const verificationToken = signToken(user._id);
    const url = `${req.protocol}://${req.get(
        'host'
    )}/api/v1/user/verifyEmail/${verificationToken}`;
    const message = `Verify Your email clicking to :${url}.\n`;
    try {
        await sendEmail({
            email,
            subject: 'Verification Email Token.',
            message,
        });
    } catch (err) {
        return next(
            new AppError(
                'There was error sending the email. Please try again later.',
                404
            )
        );
    }
};

export const signup = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {  
        const newUser = await Cafe.create({
            name: req.body.name,  //! TODO: CHECK FOR UNIQUE USER NAME SIGN UP FAILING THE TEST CASE AS OF NOW
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
        });
        //! MIGHT BE A THOUGHT TO CONVERT VERIFY EMAIL BY HASHED TOKEN INSTEAD OF JWT TOKEN BECAUSE OF SECURITY CONCERNS
        //! COULD BE THOUGHT WHILE IMPLEMENTING TWO FACTOR AUTH
        const verificationToken = signToken(newUser._id,'1d');
        const url = `${req.protocol}://${req.get(
            'host'
        )}/api/v1/cafe/verifyEmail/${verificationToken}`;
        const message = `Dear ${newUser.name}, Thank you for registering with our service. We're excited to have you on board! To complete your registration process, please verify your email address by clicking on the following verification token it will be valid for a day.: :${url}.\n`;
        try {
            await sendEmail({
                email: req.body.email,
                subject: 'Account Registration - Email Verification Token.',
                message,
            });
            res.status(202).json({
                status: 'Success',
                message:
                    'A verification token has been sent to your registered email address!',
            });
        } catch (err) {
            return next(
                new AppError(
                    'We apologize for the inconvenience, but we are currently unable to send the verification email to your registered email address. Please try again later or contact our support team for further assistance.',
                    500
                )
            );
        }
    }
);

export const login = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(
                new AppError('Please provide email and password!', 400)
            );
        }

        const cafe = await Cafe.findOne({ email }).select('+password');

        if (!cafe || !(await cafe.correctPassword(password, cafe.password))) {
            return next(
                new AppError(
                    'Incorrect email or password. Please verify your credentials and try again.',
                    401
                )
            );
        }

        if (!cafe.emailVerification) {
            const verificationToken = signToken(cafe._id, '1d');
            const url = `${req.protocol}://${req.get(
                'host'
            )}/api/v1/cafe/verifyEmail/${verificationToken}`;
            const message = `Dear ${cafe.name}, Thank you for registering with our service. We're excited to have you on board! To complete your registration process, please verify your email address by clicking on the following verification token it will be valid for a day.: :${url}.\n`;
            try {
                await sendEmail({
                    email: req.body.email,
                    subject: 'Account Registration - Email Verification Token.',
                    message,
                });
                res.status(202).json({
                    status: 'Success',
                    message:
                        'You have not verified your account.A verification token has been sent to your registered email address!',
                });
            } catch (err) {
                return next(
                    new AppError(
                        'We apologize for the inconvenience, but we are currently unable to send the verification email to your registered email address. Please try again later or contact our support team for further assistance.',
                        500
                    )
                );
            }
        }

        createSendToken(cafe, 200, res);
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
            const cafe = await Cafe.findById(decoded.id);
            if (!cafe) {
                return next(new AppError('The cafe no longer exists', 401));
            }

            if (cafe.changedPasswordAfter(decoded.iat)) {
                return next(
                    new AppError(
                        'User recently changed password! Please login again',
                        404
                    )
                );
            }
            if (!cafe.emailVerification) {
                return next(
                    new AppError('Please verify your email address.', 400)
                );
            }
            req.user = cafe;
            next();
        } catch (error) {
            return next(new AppError('Invalid token', 401));
        }
        
    }
);

export const restrictTo = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!roles.includes((req.user as ICafe).role)) {
            return next(
                new AppError(
                    'You do not have permission to perform this action',
                    403
                )
            );
        }
        next();
    };
};

export const forgotPassword = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const user = await Cafe.findOne({ email: req.body.email });
        if (!user) {
            return next(
                new AppError('There is no user with this email address', 404)
            );
        }

        //! NOTE if a user is resetting password with token email would automatically be verified.
        //! Could be modified in the future while implementing two factor authentication.
        // if (!user.emailVerification) {
        //     await createSendPasswordResetToken(
        //         req,
        //         user,
        //         201,
        //         res,
        //         req.body.email,next
        //     );
        //     res.status(200).json({
        //         status: 'Success',
        //         message:
        //             'Your email address is not yet verified. We have sent an Email Verification mail to your email address.',
        //     });
        // }

        const resetToken = user.createPasswordResetToken();
        await user.save({ validateBeforeSave: false });
        const resetURL = `${req.protocol}://${req.get(
            'host'
        )}/api/v1/cafe/resetPassword/${resetToken}`;

        const message = `Forgot your password? Submit a password request with password and passwordConfirm to :${resetURL}.\n If you didn't forget your password please ignore this email.`;

        try {
            await sendEmail({
                email: user.email,
                subject: 'Your Password Reset Token (valid for 10 mins)',
                message,
            });
            res.status(200).json({
                status: 'Success',
                message: 'Token sent to email!.',
            });
        } catch (err) {
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            await user.save({ validateBeforeSave: false });
            return next(
                new AppError(
                    'There was an error sending the email. Please try again later.',500
                )
            );
        }
    }
);

export const resetPassword = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const hashedToken = crypto
            .createHash('sha256')
            .update(req.params.token)
            .digest('hex');

        const cafe = await Cafe.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: new Date() },
        });

        if (!cafe) {
            return next(new AppError('Token is invalid or has expired', 400));
        }
        cafe.password = req.body.password;
        cafe.passwordConfirm = req.body.passwordConfirm;
        cafe.emailVerification=true;
        cafe.passwordResetToken = undefined;
        cafe.passwordResetExpires = undefined;
        await cafe.save();
        createSendToken(cafe, 200, res);
    }
);

export const updatePassword = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const user = await Cafe.findOne({ _id: (req.user as ICafe)._id }).select(
            '+password'
        );

        if (
            !(await user.correctPassword(req.body.oldPassword, user.password))
        ) {
            return next(
                new AppError(
                    'You\'ve entered the wrong password. If you forgot your password, please reset it.',
                    401
                )
            );
        }

        user.password = req.body.newPassword;
        user.passwordConfirm = req.body.newPasswordConfirm;
        await user.save();
        createSendToken(user, 201, res);
    }
);

export const verifyEmail = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const token = req.params.token;

        if(!token)
        {
            return next(
                new AppError(
                    'No token found for email verification.',
                    404
                )
            );
        }

        const decoded = await new Promise<{ id: string; iat: number }>(
            (resolve, reject) => {
                jwt.verify(token!, process.env.JWT_SECRET, (error, decoded) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(decoded as { id: string; iat: number });
                    }
                });
            }
        );


        const currentUser = await Cafe.findById(decoded.id);
        if (!currentUser) {
            return next(new AppError('The Cafe no longer exists.', 404));
        }
        if (!currentUser.emailVerification) {
            currentUser.emailVerification = true;
            await currentUser.save({ validateBeforeSave: false });
            res.status(200).json({
                status: 'Success',
                message:
                    'Email has been verified successfully. You can now log in to the application.',
            });
        } else {
            res.status(200).json({
                status: 'Success',
                message:
                    'Email has already been verified. You can log in to the application.',
            });
        }
    }
);
export const getAll = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const diners = await Cafe.find({});
        res.status(201).json({
            status: 'success',
            data: {
                diners,
            },
        });
    }
);