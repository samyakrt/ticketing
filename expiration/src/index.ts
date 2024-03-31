import 'express-async-errors';
import { natsWrapper } from '@/nats-wrapper';
import env from './env';
import { queueName } from './queues/job-name';
import { Worker } from 'bullmq';
import { OrderCreatedListener } from './events/listeners/order-created-listener';
import { ExpirationCompletePublisher } from './events/publishers/expiration-complete-publisher';

const startApp = async () => {
    try {

        await natsWrapper.connect(env.NATS_CLUSTER_ID, env.NATS_CLIENT_ID, env.NATS_URL);
        natsWrapper.client.on('close', () => {
            console.log('nats closed')
            process.exit()
        })

        const worker = new Worker<{ orderId: string }>(queueName, async ({ data }) => {
            await (new ExpirationCompletePublisher(natsWrapper.client)).publish({
                orderId: data.orderId
            })
        }, {
            connection: {
                host: env.REDIS_URI,
            },
            removeOnComplete: {
                age: 500
            }
        });

        worker.on('error', (err) => {
            console.error(err)
        })
        worker.on('progress', () => {
            console.info('progress')
        })


        new OrderCreatedListener(natsWrapper.client).listen()
    } catch (error) {
        console.error(error)
    }
}

startApp()
process.on('uncaughtException', (error: Error) => {
    console.error(`Caught exception: ${error}\n` + `Exception origin: ${error.stack}`);
    natsWrapper.client.close()
    process.exit(1)
});
process.on('SIGINT', () => natsWrapper.client.close())
process.on('SIGTERM', () => natsWrapper.client.close())

