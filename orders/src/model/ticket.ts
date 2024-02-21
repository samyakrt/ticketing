import mongoose from "mongoose";

interface TicketAttrs {
    title: string;
    price: number;
}

export interface TicketDoc extends mongoose.Document {
    title: string;
    price: number;
}

interface TicketModel extends mongoose.Model<TicketDoc> {
    build(attrs: TicketAttrs): TicketDoc
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
    }
})
schema.statics.build = (attrs: TicketAttrs) => new Ticket(attrs);
const Ticket = mongoose.model<TicketDoc,TicketModel>('tickets',schema)
export default Ticket;
