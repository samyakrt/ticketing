import { Listener, OrderCreatedEvent, OrderStatus, Subjects } from "@ticketing/shared";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { expirationQueue } from "@/queues/expiration-queue";
import { jobName } from "@/queues/job-name";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    queueGroupName = queueGroupName;
    readonly subject = Subjects.OrderCreated;
    
    async onMessage(data: { id: string; status: OrderStatus; userId: string; expiresAt: string; version: number; ticket: { id: string; price: number; }; }, message: Message): Promise<void> {

        const delay = new Date(data.expiresAt).getTime() - new Date().getTime();

        console.log('delaying job for'+ delay + 'milliseconds');
        await expirationQueue.add(jobName, {
            orderId: data.id
        }, {
            delay
        })

        message.ack()
    }

}
