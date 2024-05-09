import { Document, Schema, model } from 'mongoose';

interface IOrderItem {
    menuItemId: Schema.Types.ObjectId;
    quantity: number;
    price:number;
    totalAmount:number;
    addOnItems: {
        addOnItemId: Schema.Types.ObjectId;
        addOnItemName:string;
        selectedItems: {
            name: string;
            price: number;
        }[];
    }[];
}

interface IOrder extends Document {
    dinerId: Schema.Types.ObjectId;
    menuItems: IOrderItem[];
    status: string;
    orderDate: Date;
    tableNumber:number;
    totalAmount:number;
    orderNumber:number;
}

const OrderItemSchema = new Schema<IOrderItem>({
    menuItemId: {
        type: Schema.Types.ObjectId,
        ref: 'MenuItem',
        required: true,
    },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    

    //~ TOTAL AMOUNT = (quantity)*(price + selectedItems total price)

    totalAmount: { type: Number, required: true },
    addOnItems: [
        {
            addOnItemId: {
                type: Schema.Types.ObjectId,
                ref: 'MenuItem.addOnItems._id',
            },
            addOnItemName:{
                type:String,required:true
            },
            selectedItems: [
                {
                    itemId: {
                        type: Schema.Types.ObjectId,
                        ref: 'MenuItem.addOnItems.items._id',
                    },
                    name: { type: String, required: true },
                    price: { type: Number, required: true },
                },
            ],
        },
    ],
    
});

const OrderSchema = new Schema<IOrder>({
    dinerId: {
        type: Schema.Types.ObjectId,
        ref: 'Diner',
        required: true,
    },
    menuItems: [OrderItemSchema],
    totalAmount: { type: Number, required: true },
    tableNumber: { type: Number, required: true },

    status: {
        type: String,
        enum: ['pending', 'send_to_kitchen', 'complete'],
        default: 'pending',
    },
    orderDate: {
        type: Date,
        default: new Date(),
    },
    orderNumber: { type: Number },  
});

OrderSchema.pre<IOrder>('save', async function (next) {
    if (this.isNew) {
        const lastOrder = await Order.findOne().sort({ orderNumber: -1 }); 
        this.orderNumber = lastOrder && lastOrder.orderNumber ? lastOrder.orderNumber + 1 : 1; 
    }
    next(); 
});

const Order = model<IOrder>('Order', OrderSchema);

export default Order;
