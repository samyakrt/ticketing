import Order from '@/model/order';
import { NotFoundException, UnauthorizedException, ValidationFailedException } from '@ticketing/shared';
import {Request, Response} from 'express';
import mongoose from 'mongoose';

const findOrder = async (req: Request, res: Response) => {
    if(!mongoose.isValidObjectId(req.params.orderId)) {
        throw new ValidationFailedException('error', {
            orderId: ['Invalid object id']
        })
    }
    const order = await Order.findById(req.params.orderId).populate('ticket');
    if(!order) {
        throw new NotFoundException('Order not found');
    }

    if(order.userId !== req.user.id) {
        throw new UnauthorizedException()
    }
    
    return res.json(order)
};

export default findOrder;
