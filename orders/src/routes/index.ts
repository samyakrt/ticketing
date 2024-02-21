import { Router } from 'express';
import createOrder from './create-order';
import findOrders from './find-orders';
import updateOrder from './update-order';
import removeOrder from './remove-order';
import { validateSchema } from '@ticketing/shared';
import CreateOrderSchema from '@/schemas/create-order-schema';

const router = Router();

router.route('/')
    .get(findOrders)
    .post(validateSchema(CreateOrderSchema),createOrder);

router.route(':orderId')
    .patch(updateOrder)
    .delete(removeOrder);

export default router;
