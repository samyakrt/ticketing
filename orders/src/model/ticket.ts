import mongoose from "mongoose";
import Order, { OrderStatus } from "./order";

interface TicketAttrs {
    id?: string;
    title: string;
    price: number;
}

export interface TicketDoc extends mongoose.Document {
    title: string;
    price: number;
    isReserved(): Promise<boolean>;
    version: number;
}


interface EventPayload{
    id: string;
    version: number;
}

interface TicketModel extends mongoose.Model<TicketDoc> {
    build(attrs: TicketAttrs): TicketDoc
    findByEvent(payload: EventPayload): Promise<TicketDoc | null>;
}

const schema = new mongoose.Schema<TicketDoc>({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
}, {
    toJSON: {
        transform(doc, ret, options) {
            ret.id = ret._id;
            delete ret._id;
        },
    },
    optimisticConcurrency: true,
    versionKey: 'version',
    
})
schema.statics.build = (attrs: TicketAttrs) => new Ticket({...attrs, _id: attrs.id});
schema.statics.findByEvent = (payload: EventPayload) => Ticket.findOne({
    _id: payload.id,
    version: payload.version - 1
});
schema.methods.isReserved = async function () {
    const order = await Order.findOne({
        ticket: this, status: {
            $not: { $eq: OrderStatus.Cancelled }
        }
    });
    return !!order;
}
const Ticket = mongoose.model<TicketDoc, TicketModel>('tickets', schema)
export default Ticket;
