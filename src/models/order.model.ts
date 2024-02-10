import { Document, Schema, model } from 'mongoose';

interface IOrder extends Document {
    dinerId: Schema.Types.ObjectId;
    menuItems: {
        menuItemId: Schema.Types.ObjectId;
        quantity: number;
        price:number;
    }[];
    status: string;
    orderDate: Date;
}

const OrderSchema = new Schema<IOrder>({
    dinerId: {
        type: Schema.Types.ObjectId,
        ref: 'Diner',
        required: true,
    },
    menuItems: [
        {
            menuItemId: {
                type: Schema.Types.ObjectId,
                ref: 'MenuItem',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
        },
    ],
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed'],
        default: 'pending',
    },
    orderDate: {
        type: Date,
        default: new Date(),
    },
});

const Order = model<IOrder>('Order', OrderSchema);

export default Order;
