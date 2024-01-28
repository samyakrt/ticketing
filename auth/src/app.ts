import 'express-async-errors';
import express from 'express';
import routes from './routes';
import cookieSession from 'cookie-session';
import { handleErrors } from 'shared';

const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(cookieSession({
    signed: false,
    secure: false,
}));
app.use('/api/users', routes);

app.use(handleErrors);


export default app;
