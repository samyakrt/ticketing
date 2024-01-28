import 'express-async-errors';
import express from 'express';
import routes from './routes';
// import handleErrors from './core/handle-errors';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(cookieSession({
    signed: false,
    secure: false,
}));
app.use('/api/tickets',routes);

// app.use(handleErrors);


export default app;
