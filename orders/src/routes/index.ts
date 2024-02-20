import { Router } from 'express';
import createOrder from './create-order';
import findOrders from './find-orders';
import updateOrder from './update-order';
import removeOrder from './remove-order';

const router = Router();

router.route('/')
    .get(findOrders)
    .post(createOrder);

router.route(':orderId')
    .patch(updateOrder)
    .delete(removeOrder);

export default router;
