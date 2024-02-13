

import express from 'express';
import currentUser from './current-user';
import signIn from './sign-in';
import SignUpSchema from '@/schemas/sign-up-schema';
import signUp from './sign-up';
import checkIfEmailExists from '@/middlewares/check-if-email-exists';
import signOut from './sign-out';
import { validateSchema, auth, currentUser as currentUserMiddleware  } from '@ticketing/shared';

const routes = express();

routes.get('/current-user',currentUserMiddleware, auth, currentUser);
routes.post('/sign-out',currentUserMiddleware, auth, signOut);
routes.post('/sign-in', validateSchema(SignUpSchema), signIn);
routes.post('/sign-up', validateSchema(SignUpSchema), checkIfEmailExists, signUp);

export default routes;
