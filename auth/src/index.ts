import express from 'express';
import routes from './routes';
import 'express-async-errors';
import handleErrors from './core/handle-errors';
import { StatusCodes } from 'http-status-codes';

const app = express();

app.use(express.json());

app.use('/api/users',routes);

app.use(handleErrors);
app.use((req,res) => res.status(StatusCodes.NOT_FOUND).json({
    message: 'URL not found'
}));

app.listen(3000,() => console.log('listening to 3000'))
