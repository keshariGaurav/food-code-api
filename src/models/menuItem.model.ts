import { Document, ObjectId, Schema, model } from 'mongoose';
import Category from './category.model';

export interface IAddOnItem extends Document {
    name: string;
    required: boolean;
    multiSelect: boolean;
    limit: boolean;
    limitSize?: number;

    items: [
        {
            name: string;
            price: number;
            _id:ObjectId;
        }
    ];
}
const AddOnItemSchema = new Schema<IAddOnItem>({
    name: { type: String, required: true },
    required: { type: Boolean, required: true },
    multiSelect: { type: Boolean, required: true },
    limit: { type: Boolean, required: true },
    limitSize: {
        type: Number,
        required: function () {
            return this.limit;
        },
        validate: {
            validator: function (limitSize: number) {
                if (!this.limit) return limitSize === null || limitSize === 0;
                return limitSize > 0;
            },
            message: (props) =>
                `Invalid limitSize value: ${props.value}. If limit is false, limitSize should be null or 0. If limit is true, limitSize must be a positive number.`,
        },
        default: null,
    },
    items: [
        {
            name: { type: String, required: true },
            price: { type: Number, required: true },
        },
    ],
});
export interface IMenuItem extends Document {
    name: string;
    description: string;
    price: number;
    image: string;
    tag: string;
    available: boolean;
    categoryId: Schema.Types.ObjectId;
    addOnItems: IAddOnItem[];
    orderCount: number;
}

const MenuItemSchema = new Schema<IMenuItem>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    tag: {
        type: String,
        enum: [null, 'best_seller', 'must_try', 'our_special'],
    },
    image: {
        type: String,
        required: false,
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
    addOnItems: [AddOnItemSchema],
    orderCount: {
        type: Number,
        default: 0,
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
