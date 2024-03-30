import 'express-async-errors';
import mongoose from 'mongoose';
import app from './app';
import { natsWrapper } from '@/nats-wrapper';
import env from './env';
import { OrderCreatedListener } from './events/listeners/order-created-listener';
import { OrderCancelledListener } from './events/listeners/order-cancelled-listener';

const startApp = async () => {
    try {
        await mongoose.connect(env.MONGODB_URI, {
            autoIndex: true,
        })

        await natsWrapper.connect(env.NATS_CLUSTER_ID, env.NATS_CLIENT_ID, env.NATS_URL);
        natsWrapper.client.on('close', () => {
            console.log('nats closed')
            process.exit()
        })

        new OrderCreatedListener(natsWrapper.client).listen();
        new OrderCancelledListener(natsWrapper.client).listen();
        console.log('Connected to mongodb');

        app.listen(3000, () => console.log('listening to port 3000'))

    } catch (error) {
        console.error(error)
    }
}

startApp()
process.on('uncaughtException', (error: Error) => {
    console.error(`Caught exception: ${error}\n` + `Exception origin: ${error.stack}`);
    natsWrapper.client.close();
    process.exit(1);
});
process.on('SIGINT', () => natsWrapper.client.close())
process.on('SIGTERM', () => natsWrapper.client.close())

