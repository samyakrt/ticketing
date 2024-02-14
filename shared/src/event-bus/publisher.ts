import { Stan } from "node-nats-streaming";
import { Event } from "./events/event";

export abstract class Publisher<T extends Event> {
    abstract subject: T['subject'];
    private client: Stan;

    constructor(client: Stan) {
        this.client = client;
    }

    publish(payload: T['data']) : Promise<void> { 
        return new Promise((resolve,reject) => {
            this.client.publish(this.subject,JSON.stringify(payload), (err,guid) => {
                if(err) {
                    return reject(err);
                }
                console.debug(`Subject: ${this.subject} published, guid: ${guid}`);
                return resolve();
            })
        })
    }

} 
