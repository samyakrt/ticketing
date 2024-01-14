

import express from 'express';
import currentUser from './current-user';
import signIn from './sign-in';
import validateSchema from '@/middlewares/validate-schema';
import SignUpSchema from '@/schemas/sign-up-schema';
import signUp from './sign-up';
import checkIfEmailExists from '@/middlewares/check-if-email-exists';

const routes = express();

routes.get('/current-user',currentUser);
routes.get('/sign-in',signIn);
routes.post('/sign-up',validateSchema(SignUpSchema),checkIfEmailExists,signUp);

export default routes;
