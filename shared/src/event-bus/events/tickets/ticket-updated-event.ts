import { Subjects } from "../subjects";

export interface TicketUpdatedEvent {
    subject: Subjects.ticketUpdated,
    data: {
        id: string;
        title: string;
        price: number;
        userId: string;
        version: number;
        orderId?: string;
    }
}
