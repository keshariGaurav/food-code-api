import bcrypt from 'bcrypt';
import mongoose, { Document, Schema } from 'mongoose';
import validator from 'validator';
import crypto from 'crypto';

export interface IDiner extends Document {
    _id: string;
    name: string;
    email: string;
    contactNumber?: number;
    otp?: string;
    otpExpirationTime?: number;
    createdAt?: Date;
    createOtpToken(): string;
    role:string;
}

const dinerSchema = new Schema<IDiner>({
    name: {
        type: String,
        required: [true, 'Please provide your name.'],
    },
    email: { type: String, unique: true, sparse: true },
    role: { type: String, enum: ['guest', 'registered'], required: true, default:'registered' },

    contactNumber: {
        type: Number,
    },
    otp: {
        type: String,
    },
    otpExpirationTime: Number,
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

dinerSchema.methods.createOtpToken = function (): string {
    const resetToken = crypto.randomBytes(3).toString('hex');
    this.otp = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');
    this.otpExpirationTime = new Date(Date.now() + 10 * 60 * 1000);
    return resetToken;
};

const diner = mongoose.model<IDiner>('Diner', dinerSchema);
export default diner;
