import { Router } from 'express';
import createOrder from './create-order';
import findOrders from './find-orders';
import cancelOrder from './cancel-order';
import { validateSchema } from '@ticketing/shared';
import CreateOrderSchema from '@/schemas/create-order-schema';
import findOrder from './find-order';

const router = Router();

router.route('/')
    .get(findOrders)
    .post(validateSchema(CreateOrderSchema), createOrder);

router.route('/:orderId')
    .get(findOrder)
    .patch(cancelOrder);

export default router;
