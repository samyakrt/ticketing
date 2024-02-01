import 'express-async-errors';
import express from 'express';
import routes from './routes';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import { currentUser,NotFoundException, handleErrors } from 'shared';

const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(cookieSession({
    signed: false,
    secure: false,
}));
app.use(currentUser);

app.use('/api/tickets',routes);

app.all('*',(req,res) => {
    throw new NotFoundException();
});
app.use(handleErrors);


export default app;
