import { Publisher, Subjects, TicketUpdatedEvent } from "@ticketing/shared";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    readonly subject = Subjects.ticketUpdated;
}
