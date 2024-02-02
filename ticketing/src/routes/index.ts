import { Router } from 'express';
import createTicket from './new';
import { auth, validateSchema } from 'shared';
import CreateTicketSchema from '@/schemas/create-ticket-schema';
import showTicketDetail from './show';

const router = Router();

router.post('/',auth,validateSchema(CreateTicketSchema),createTicket)
router.get('/:ticketId',auth,showTicketDetail)
export default router;
