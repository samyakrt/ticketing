import { Router } from 'express';
import createPayment from './create-payment';
import createPaymentSchema from '@/schema/create-payment-schema';
import { validateSchema } from '@ticketing/shared';

const router=  Router();

router.post('/',validateSchema(createPaymentSchema),createPayment);

export default router;
