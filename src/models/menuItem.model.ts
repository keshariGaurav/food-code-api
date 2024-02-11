import { Document, Schema, model } from 'mongoose';
import Category from './category.model';

export interface IMenuItem extends Document {
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

MenuItemSchema.pre('save', async function (next) {
    try {
        // Check if categoryId exists in Category model
        const category = await Category.findById(this.categoryId);

        if (!category) {
            throw new Error('Category does not exist');
        }

        next();
    } catch (error) {
        next(error);
    }
});

const MenuItem = model<IMenuItem>('MenuItem', MenuItemSchema);

export default MenuItem;
