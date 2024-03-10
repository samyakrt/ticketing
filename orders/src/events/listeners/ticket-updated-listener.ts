import { Listener, NotFoundException, Subjects, TicketUpdatedEvent } from "@ticketing/shared";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import Ticket from "@/model/ticket";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
    queueGroupName: string = queueGroupName;
    readonly subject = Subjects.ticketUpdated;

    async onMessage(data: TicketUpdatedEvent['data'], message: Message): Promise<void> {

        const ticket = await Ticket.findByEvent(data);

        if (!ticket) {
            console.error('Ticket not found')
            return;
        }
        ticket.set({ title: data.title, price: data.price });
        await ticket.save();
        console.info('ticket updated')
        message.ack();
    }

}
