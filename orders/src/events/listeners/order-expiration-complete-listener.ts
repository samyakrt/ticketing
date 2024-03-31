import { ExpirationCompleteEvent, Listener, OrderCancelledEvent, OrderStatus, Subjects } from "@ticketing/shared";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import Order from "@/model/order";
import { OrderCancelledPublisher } from "../order-cancelled-publisher";

export class OrderExpirationCompleteListener extends Listener<ExpirationCompleteEvent> {
    queueGroupName = queueGroupName;
    readonly subject = Subjects.ExpirationComplete;
    async onMessage(data: ExpirationCompleteEvent['data'], message: Message): Promise<void> {
        const order = await Order.findById(data.orderId);
        if (!order) {
            console.error('Order not found');
            return
        }

        if (order.status === OrderStatus.Complete) {
            message.ack();
            return;
        }

        await order.set({ status: OrderStatus.Cancelled }).save();

        (new OrderCancelledPublisher(this.client)).publish({
            id: data.orderId,
            ticket: {
                id: order.ticket.id
            },
            version: order.version
        });
        message.ack();
    }


}
