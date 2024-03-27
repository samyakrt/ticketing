import { ExpirationCompleteEvent, Publisher, Subjects } from "@ticketing/shared";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    readonly subject = Subjects.ExpirationComplete;
}
