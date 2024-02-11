import { Publisher } from "../../publisher";
import { Subjects } from "../subjects";
import { TicketUpdatedEvent } from "./ticket-updated-event";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    readonly subject = Subjects.ticketUpdated;
}
