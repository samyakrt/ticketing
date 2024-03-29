import { Publisher, Subjects, TicketCreatedEvent } from "@ticketing/shared";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject = Subjects.ticketCreated;
}
