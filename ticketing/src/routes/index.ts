import { Router } from 'express';
import createTicket from './new';
import { auth, validateSchema } from '@ticketing/shared';
import CreateTicketSchema from '@/schemas/create-ticket-schema';
import showTicketDetail from './show';
import queryTickets from './query-tickets';
import { isValidTicket } from '@/middlewares';
import updateTicket from './update-ticket';

const router = Router();

router.route('/:ticketId')
    .get(auth, isValidTicket, showTicketDetail)
    .patch(auth,isValidTicket,validateSchema(CreateTicketSchema),updateTicket);

router.route('/')
    .get(auth, queryTickets)
    .post(auth, validateSchema(CreateTicketSchema), createTicket);

export default router;
