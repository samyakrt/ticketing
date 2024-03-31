import mongoose from "mongoose";

interface PaymentAttrs {
    orderId: string;
    stripeId: string;
}

interface PaymentDoc extends mongoose.Document {
    id: string;
    orderId: string;
    stripeId: string;
}


interface PaymentModel extends mongoose.Model<PaymentDoc> {
    build(attrs: PaymentAttrs): PaymentDoc;
}

const schema = new mongoose.Schema<PaymentDoc, PaymentModel>({
    orderId: {
        type: String,
        required: true,
    },
    stripeId: {
        type: String,
        required: true,
    }
})

schema.index({ orderId: 1, stripeId: 1 }, { unique: true });

schema.statics.build = (attrs: PaymentAttrs) => new Payment({
    orderId: attrs.orderId,
    stripeId: attrs.stripeId,
});

const Payment =  mongoose.model<PaymentDoc, PaymentModel>('payments', schema);

export default Payment;
