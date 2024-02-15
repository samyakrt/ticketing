import 'express-async-errors';
import mongoose from 'mongoose';
import app from './app';
import { natsWrapper } from './nats-wrapper';

const startApp = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI!, {
            autoIndex: true,
        })
        
        await natsWrapper.connect('ticketing','asd','http://nats-srv:4222');
        natsWrapper.client.on('close', () => {
            process.exit()
        })
        console.log('Connected to mongodb');

        app.listen(3000,() => console.log('listening to port 3000'))
    } catch (error) {
        console.error(error)
    }
}

process.on('SIGINT', () => natsWrapper.client.close())
process.on('SIGTERM', () => natsWrapper.client.close())
startApp()

