import mongoose, { Schema } from "mongoose";
import { OrderStatus } from '@ticketing/shared'
import { TicketDoc } from "./ticket";

export { OrderStatus };
interface OrderAttrs {
    userId: string;
    status: OrderStatus;
    expiresAt: Date;
    ticket: TicketDoc;
}

interface OrderDoc extends mongoose.Document {
    userId: string;
    status: OrderStatus;
    expiresAt: Date;
    ticket: TicketDoc;
    version: number;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
    build(attrs: OrderAttrs): OrderDoc
}

const OrderSchema = new mongoose.Schema<OrderDoc>({
    status: {
        type: String,
        enum: Object.values(OrderStatus),
        default: OrderStatus.Created,
        required: true,
    },
    expiresAt: {
        type: mongoose.Schema.Types.Date,
        required: true
    },
    userId: {
        type: String,
        required: true,
    },
    ticket: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tickets'
    }
}, {
    toJSON: {
        transform(doc, ret, _) {
            ret.id = ret._id;
            delete ret._id;
        }
    },
    optimisticConcurrency: true,
    versionKey: 'version'
})
OrderSchema.statics.build = (ticket: OrderAttrs) => new Order(ticket);

const Order = mongoose.model<OrderDoc, OrderModel>('orders', OrderSchema);

export default Order;
