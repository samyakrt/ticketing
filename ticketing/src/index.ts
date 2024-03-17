import 'express-async-errors';
import mongoose from 'mongoose';
import app from './app';
import { natsWrapper } from './nats-wrapper';
import env from './env';
import { OrderCancelledListener } from './listeners/order-cancelled-listener';
import { OrderCreatedListener } from './listeners/order-created-listener';

const startApp = async () => {
    try {
        await mongoose.connect(env.MONGODB_URI, {
            autoIndex: true,
        })
        console.log('Connected to mongodb');
        
        await natsWrapper.connect(env.NATS_CLUSTER_ID,env.NATS_CLIENT_ID,env.NATS_URL);
        natsWrapper.client.on('close', () => {
            process.exit()
        })

        new OrderCreatedListener(natsWrapper.client).listen();
        new OrderCancelledListener(natsWrapper.client).listen();


        app.listen(3000,() => console.log('listening to port 3000'))
    } catch (error) {
        console.error(error)
    }
}

process.on('SIGINT', () => natsWrapper.client.close())
process.on('SIGTERM', () => natsWrapper.client.close())
startApp()

