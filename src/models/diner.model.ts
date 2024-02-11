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
}

const dinerSchema = new Schema<IDiner>({
    name: {
        type: String,
        required: [true, 'Please provide your name.'],
    },
    email: {
        type: String,
        required: [true, 'Please provide your email address.'],
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email.'],
    },

    contactNumber: {
        type: Number,
    },
    otp: {
        type: String,
        select: false,
    },
    otpExpirationTime: Number,
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

const diner = mongoose.model<IDiner>('Diner', dinerSchema);
export default diner;
