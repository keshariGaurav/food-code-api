import { Document, Schema, model } from 'mongoose';


interface IMenuItem extends Document {
    name: string;
    description: string;
    price: number;
    image: string;
    available: boolean;
    categoryId: Schema.Types.ObjectId;
}

const MenuItemSchema = new Schema<IMenuItem>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    available: {
        type: Boolean,
        default: true,
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
});

const MenuItem = model<IMenuItem>('MenuItem', MenuItemSchema);

export default MenuItem;
