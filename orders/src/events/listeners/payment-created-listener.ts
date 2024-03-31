import { Listener, OrderStatus, Subjects } from "@ticketing/shared";
import { PaymentCreatedEvent } from "@ticketing/shared/src/event-bus/events/payments/payment-created-event";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import Order from "@/model/order";

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
    queueGroupName = queueGroupName;
    readonly subject = Subjects.PaymentCreated;

    async onMessage(data: PaymentCreatedEvent['data'], message: Message): Promise<void> {
        const order = await Order.findById(data.orderId);
        
        if(!order) {
            console.error('Order not found');
            return;
        }

        await order.set({
            status: OrderStatus.Complete
        }).save();

        message.ack();
    }

}
