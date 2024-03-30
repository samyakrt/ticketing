import { Listener, OrderCancelledEvent, OrderStatus, Subjects } from "@ticketing/shared";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import Order from "@/models/order";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
    queueGroupName = queueGroupName;
    readonly subject = Subjects.OrderCancelled;
    async onMessage(data: OrderCancelledEvent['data'], message: Message): Promise<void> {
        const order = await Order.findOne({
            _id: data.id,
            version: data.version - 1
        })
        if(!order) {
            console.error('Order not found');
            return;
        }
        await order?.set({ status: OrderStatus.Cancelled }).save();
        message.ack();
    }

}
