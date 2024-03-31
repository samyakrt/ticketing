import { Publisher, Subjects } from "@ticketing/shared";
import { PaymentCreatedEvent } from "@ticketing/shared/src/event-bus/events/payments/payment-created-event";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    readonly subject = Subjects.PaymentCreated;

}
