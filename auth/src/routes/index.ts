

import express from 'express';
import currentUser from './current-user';
import signIn from './sign-in';
import validateSchema from '@/middlewares/validate-schema';
import SignUpSchema from '@/schemas/sign-up-schema';
import signUp from './sign-up';
import checkIfEmailExists from '@/middlewares/check-if-email-exists';
import loggedInUser from '@/middlewares/logged-in-user';
import signOut from './sign-out';

const routes = express();

routes.get('/current-user',loggedInUser ,currentUser);
routes.post('/sign-out',loggedInUser ,signOut);
routes.post('/sign-in',validateSchema(SignUpSchema), signIn);
routes.post('/sign-up',validateSchema(SignUpSchema),checkIfEmailExists,signUp);

export default routes;
