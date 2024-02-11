import { Subjects } from "../events/subjects";

export interface TicketUpdatedEvent {
    subject: Subjects.ticketUpdated,
    data: {
        id: string;
        price: string;
    }
}
