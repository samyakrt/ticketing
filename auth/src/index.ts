import 'express-async-errors';
import mongoose from 'mongoose';
import app from './app';

const startApp = async () => {
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
            autoIndex: true,
        })
        console.log('Connected to mongodb');

        app.listen(3000,() => console.log('listening to port 3000'))
    } catch (error) {
        console.error(error)
    }
}

startApp()

