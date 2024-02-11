import { Subjects } from "../subjects";

export interface TicketUpdatedEvent {
    subject: Subjects.ticketUpdated,
    data: {
        id: string;
        price: string;
    }
}
