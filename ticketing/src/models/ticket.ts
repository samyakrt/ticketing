import mongoose, { Schema } from "mongoose";

interface TicketProps {
    title: string;
    price: number;
    userId: string;
}

interface TicketDoc extends mongoose.Document {
    title: string;
    price: number;
    userId: string;
}

interface TicketModel extends mongoose.Model<TicketDoc> {
    build(attrs:TicketProps): TicketDoc
}

const TicketingSchema = new mongoose.Schema<TicketDoc>({
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
TicketingSchema.statics.build = (ticket: TicketProps) => new Ticket(ticket);

const Ticket =  mongoose.model<TicketDoc, TicketModel>('tickets',TicketingSchema);


export default Ticket;
