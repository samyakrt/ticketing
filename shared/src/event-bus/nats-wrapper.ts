import nats, { Stan, } from "node-nats-streaming";

class NatsWrapper {

    connect(clusterId: string, clientId: string, url: string): Promise<void> {
        const client = nats.connect(clusterId, clientId, { url });

        return new Promise((resolve,reject) => {
            client.on('connect', () => {
                console.debug('connected to NATS')
                return resolve();
            });

            client.on('error', () => {
                console.error('unable to connect to nats')
                return reject();
            });
        })
    }
}

export const natsWrapper = new NatsWrapper()
