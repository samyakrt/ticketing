import 'express-async-errors';
import express from 'express';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import app from './app';

const startApp = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI!, {
            autoIndex: true,
        })
        console.log('Connected to mongodb');

        app.listen(3000,() => console.log('listening to port 3000'))
    } catch (error) {
        console.error(error)
    }
}

startApp()

