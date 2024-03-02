import { OrderCreatedEvent, Publisher, Subjects } from "@ticketing/shared";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
     readonly subject = Subjects.OrderCreated;
}
