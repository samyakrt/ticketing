import { Publisher, Subjects, TicketCreatedEvent } from "shared";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject = Subjects.ticketCreated;
}
