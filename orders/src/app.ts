import 'express-async-errors';
import express from 'express';
import routes from './routes';
import cookieSession from 'cookie-session';
import { currentUser,NotFoundException, handleErrors } from '@ticketing/shared';

const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(cookieSession({
    signed: false,
    secure: false,
}));
app.use(currentUser);

app.use('/api/orders',routes);

app.all('*',() => {
    throw new NotFoundException();
});
app.use(handleErrors);


export default app;
