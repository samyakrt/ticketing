import { Listener, OrderCreatedEvent, OrderStatus, Subjects } from "@ticketing/shared";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import Ticket from "@/models/ticket";
import { TicketUpdatedPublisher } from "@/events";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    queueGroupName = queueGroupName;
    readonly subject = Subjects.OrderCreated;

    async onMessage(data: OrderCreatedEvent['data'], message: Message): Promise<void> {
        const ticket = await Ticket.findById(data.ticket.id)
        if (!ticket) {
            throw new Error('Ticket not found');
        }
        ticket.set({ orderId: data.id });
        await ticket.save();

        await new TicketUpdatedPublisher(this.client).publish({
            id: ticket.id,
            price: ticket.price,
            title: ticket.title,
            userId: ticket.userId,
            version: ticket.version,
            orderId: ticket.orderId
        });
        message.ack();
    }
}
