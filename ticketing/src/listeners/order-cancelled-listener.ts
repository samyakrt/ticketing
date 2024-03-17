import { Listener, OrderCancelledEvent, Subjects } from "@ticketing/shared";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import Ticket from "@/models/ticket";
import { TicketUpdatedPublisher } from "@/events";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
    queueGroupName = queueGroupName;
    readonly subject =  Subjects.OrderCancelled;

    async onMessage(data: OrderCancelledEvent['data'], message: Message): Promise<void> {
        
        const ticket = await Ticket.findById(data.ticket.id);
        if(!ticket) {
            throw new Error('Ticket not found');
        }
        await ticket.set({ orderId: undefined }).save();

        await new TicketUpdatedPublisher(this.client).publish({
            id: ticket.id,
            title: ticket.title,
            price: ticket.price,
            userId: ticket.userId,
            version: ticket.version,
            orderId:ticket.orderId
        })
        message.ack();
    }
    
}
