import Order from '@/model/order';
import {Request, Response} from 'express';

const findOrders = async (req: Request, res: Response) => {
    const orders = await Order.find({
        userId: req.user.id
    }).populate('ticket')
    return res.json(orders)
};

export default findOrders;
