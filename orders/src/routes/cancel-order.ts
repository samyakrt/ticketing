import Order, { OrderStatus } from '@/model/order';
import { ForbiddenException, NotFoundException, UnauthorizedException } from '@ticketing/shared';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { natsWrapper } from '@/nats-wrapper';
import { OrderCancelledPublisher } from '@/events/order-cancelled-publisher';

const cancelOrder = async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderId).populate('ticket');
    if (!order) {
        throw new NotFoundException('Order not found');
    }

    if (order.userId !== req.user.id) {
        throw new UnauthorizedException()
    }

    if (order.status === OrderStatus.Complete) {
        throw new ForbiddenException('Order can\'t be cancelled as it is processed');
    }
    order.status = OrderStatus.Cancelled;
    await order.save();

    new OrderCancelledPublisher(natsWrapper.client).publish({
        id: order.id,
        ticket: {
            id: order.ticket.id,
        }
    })
    res.status(StatusCodes.NO_CONTENT).json();
};

export default cancelOrder;
