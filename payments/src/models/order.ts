import { OrderStatus } from '@ticketing/shared';
import mongoose from 'mongoose';

interface OrderAttrs {
    id: string;
    status: OrderStatus;
    version: number;
    userId: string;
    price: number;
}

interface OrderDoc extends mongoose.Document {
    status: OrderStatus;
    version: number;
    userId: string;
    price: number;

}

interface OrderModel extends mongoose.Model<OrderDoc> {
build(attrs: OrderAttrs): OrderDoc;
}


const OrderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    },
    optimisticConcurrency: true,
    versionKey: 'version',
})


OrderSchema.statics.build =(attrs: OrderAttrs) => {
    return new Order({
        _id: attrs.id,
        status: attrs.status,
        version: attrs.version,
        price: attrs.price,
        userId: attrs.userId,
    })
}

const Order = mongoose.model<OrderDoc, OrderModel>('orders',OrderSchema)

export default Order;
