import 'express-async-errors';
import express from 'express';
import cookieSession from 'cookie-session';
import { currentUser, NotFoundException, handleErrors } from '@ticketing/shared';
import routes from '@/routes';

const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(cookieSession({
    signed: false,
    secure: false,
}));
app.use(currentUser);
app.use('/api/payments', routes);

app.all('*', () => {
    throw new NotFoundException();
});
app.use(handleErrors);


export default app;
