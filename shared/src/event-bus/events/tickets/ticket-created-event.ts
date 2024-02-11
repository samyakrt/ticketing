import { Subjects } from "../subjects";

export interface TicketCreatedEvent  {
    subject: Subjects.ticketCreated,
    data: {
        id: string;
        name: string;
        price: number;
        userId: string;
    }
}
