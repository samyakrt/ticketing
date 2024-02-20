import mongoose, { Schema } from "mongoose";

interface OrderProps {
    title: string;
    price: number;
    userId: string;
}

interface OrderDoc extends mongoose.Document {
    title: string;
    price: number;
    userId: string;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
    build(attrs:OrderProps): OrderDoc
}

const OrderSchema = new mongoose.Schema<OrderDoc>({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true,
    },
}, {
    toJSON: {
        transform(doc,ret,_) {
            ret.id = ret._id;
            delete ret._id;
            return {
                id: doc.id,
                title: doc.title,
                price: doc.price
            }
        }
    }
})
OrderSchema.statics.build = (ticket: OrderProps) => new Order(ticket);

const Order =  mongoose.model<OrderDoc, OrderModel>('orders',OrderSchema);

export default Order;
