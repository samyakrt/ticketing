import { OrderCancelledEvent, Publisher, Subjects } from "@ticketing/shared";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
     readonly subject = Subjects.OrderCancelled;
}
