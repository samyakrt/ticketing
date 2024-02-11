import { Message, Stan } from "node-nats-streaming";
import { TicketCreatedEvent, TicketUpdatedEvent } from './events/tickets';

type Event = (TicketCreatedEvent | TicketUpdatedEvent)

export abstract class Listener<T extends Event> {
    protected ackWait = 5 * 1000;
    private client: Stan;
    abstract queueGroupName: string;
    abstract subject: T['subject'];
    abstract onMessage(data: T['data'], message: Message): Promise<void>

    constructor(client: Stan) {
        this.client = client;
    }

    private subscriptionOptions() {
        return this.client.subscriptionOptions()
            .setManualAckMode(true)
            .setAckWait(this.ackWait)
            .setDeliverAllAvailable()
            .setDurableName(this.queueGroupName);
    }

    listen() {
        const subscription = this.client.subscribe(this.subject, this.queueGroupName, this.subscriptionOptions())
        subscription.on('message', (message: Message) => {
            console.log(`Message received ${this.subject}/${this.queueGroupName}`);
            const data = this.parseMessage(message);
            this.onMessage(data, message);
        })
    }

    private parseMessage(message: Message) {
        const data = message.getData();
        return typeof data === 'string' ? JSON.parse(data) : JSON.stringify(data.toString('utf8'))
    }

}