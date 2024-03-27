import 'express-async-errors';
import mongoose from 'mongoose';
import app from './app';
import { natsWrapper } from '@/nats-wrapper';
import env from './env';
import { TicketCreatedListener } from './events/listeners/ticket-created-listener';
import { TicketUpdatedListener } from './events/listeners/ticket-updated-listener';
import { OrderExpirationCompleteListener } from './events/listeners/order-expiration-complete-listener';

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

        new TicketCreatedListener(natsWrapper.client).listen();
        new TicketUpdatedListener(natsWrapper.client).listen();
        new OrderExpirationCompleteListener(natsWrapper.client).listen();

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

