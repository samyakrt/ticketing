import { Subjects } from "../events/subjects";

export interface TicketCreatedEvent  {
    subject: Subjects.ticketCreated,
    data: {
        id: string;
        name: string;
        price: number;
    }
}
