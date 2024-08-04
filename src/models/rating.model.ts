import mongoose, { Schema, Document } from 'mongoose';

export interface IRating extends Document {
    rating: number;
    orderId: Schema.Types.ObjectId;
    userId: Schema.Types.ObjectId;
    feedback: string;
}

const ratingSchema = new Schema<IRating>({
    rating: { type: Number, min: 1, max: 5, required: true },
    orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'diner', required: true },
    feedback: { type: String, required: true },
});
ratingSchema.index({ orderId: 1, userId: 1 }, { unique: true });
const Rating = mongoose.model<IRating>('Rating', ratingSchema);

export default Rating;
