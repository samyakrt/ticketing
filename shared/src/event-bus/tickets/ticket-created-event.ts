import { Subjects } from "../events/subjects";

export interface TicketCreatedEvent  {
    subject: Subjects.ticketCreated,
    data: {
        id: string;
        version: number;
        name: string;
        price: number;
    }
}
