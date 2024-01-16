import 'express-async-errors';
import express from 'express';
import routes from './routes';
import handleErrors from './core/handle-errors';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
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

