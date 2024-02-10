import mongoose, { Schema, Document } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';


export interface ICafe extends Document {
    name: string;
    email: string;
    emailVerification: boolean;
    role: string;
    createdAt: Date;
    location:string;
    passwordChangedAt?: Date;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
    password: string;
    passwordConfirm?: string;
    correctPassword(
        candidatePassword: string,
        userPassword: string
    ): Promise<boolean>;
    changedPasswordAfter(JWTTimestamp: number): boolean;
    createPasswordResetToken(): string;
}

const cafeSchema: Schema<ICafe> = new Schema<ICafe>({
    name: {
        unique: true,
        type: String,
        required: [true, 'A Cafe must have a name.'],
    },
    email: {
        unique: true,
        type: String,
        required: [true, 'A Cafe must have an email'],
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email'],
    },
    emailVerification: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    location:{
        type:String,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    passwordChangedAt: {
        type: Date,
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            validator: function (el: string) {
                return el === this.password;
            },
            message: 'Passwords are not the same',
        },
    },
});



cafeSchema.pre<ICafe>('save', function (next:NextFunction) {
    if (!this.isModified('password') || this.isNew) {
        return next();
    }
    this.passwordChangedAt = new Date(Date.now() - 1000);
    next();
});

cafeSchema.pre<ICafe>('save', async function (next:NextFunction) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = '';
    next();
});

cafeSchema.methods.correctPassword = async function (
    candidatePassword: string,
    userPassword: string
): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, userPassword);
};

cafeSchema.methods.changedPasswordAfter = function (
    JWTTimestamp: number
): boolean {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(
            (this.passwordChangedAt.getTime() / 1000).toString(),
            10
        );
        return JWTTimestamp < changedTimestamp;
    }
    return false;
};

cafeSchema.methods.createPasswordResetToken = function (): string {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');
    this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);
    return resetToken;
};
cafeSchema.index(
    { name: 1 },
    { unique: true, collation: { locale: 'en', strength: 2 } }
);

const Cafe = mongoose.model<ICafe>('Cafe', cafeSchema);
export default Cafe;
