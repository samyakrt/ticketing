import { Router } from 'express';
import createTicket from './new';
import { auth, validateSchema } from 'shared';
import CreateTicketSchema from '@/schemas/create-ticket-schema';

const router = Router();

router.post('/',auth,validateSchema(CreateTicketSchema),createTicket)

export default router;
