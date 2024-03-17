import { Listener, Subjects, TicketCreatedEvent } from "@ticketing/shared";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import Ticket from "@/model/ticket";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    queueGroupName = queueGroupName;
    readonly subject = Subjects.ticketCreated;

    async onMessage(data: { id: string; title: string; price: number; userId: string; }, message: Message): Promise<void> {
        const ticket = Ticket.build({
            id: data.id,
            price: data.price,
            title: data.title,
        });
        await ticket.save();

        message.ack();
    }

}
