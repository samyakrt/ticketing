import 'express-async-errors';
import express from 'express';
import routes from './routes';
import handleErrors from './core/handle-errors';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

const app = express();

app.set('trust proxy', true);
app.use(express.json());
app.use(cookieSession({
    signed: false,
    secure: false,
}));

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
