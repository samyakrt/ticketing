import 'express-async-errors';
import express from 'express';
import routes from './routes';
import handleErrors from './core/handle-errors';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';

const app = express();

app.use(express.json());

app.use('/api/users', routes);



const startDb = async () => {
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
            autoIndex: true,
        })
        console.log('Connected to mongodb')
    } catch (error) {
        console.error(error)
    }
}

startDb()
app.use(handleErrors);

app.listen(3000, () => console.log('listening to 3000'))
