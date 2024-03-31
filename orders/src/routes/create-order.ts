import Order from '@/model/order';
import Ticket from '@/model/ticket';
import { ForbiddenException, NotFoundException, OrderStatus } from '@ticketing/shared';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { natsWrapper } from '@/nats-wrapper';
import { OrderCreatedPublisher } from '@/events/order-created-publisher';

const createOrder = async (req: Request, res: Response) => {
    // find the ticket the user is trying to order
    const ticketId: string = req.body.ticketId;
    const ticket = await Ticket.findOne({ _id: ticketId });
    if (!ticket) {
        throw new NotFoundException('Ticket not found');
    }
    // make sure that this ticket is not already reserved
    const isReserved = await ticket.isReserved();

    if (isReserved) {
        throw new ForbiddenException('Ticket already reserved')
    }
    // calculate an expiration date for this order
    const expiration = new Date();
    expiration.setMinutes(expiration.getMinutes() + 1);
    // build an order and save it to db
    const order = Order.build({
        expiresAt: expiration,
        status: OrderStatus.Created,
        ticket,
        userId: req.user.id
    })

    await order.save();
    // publish event order was created
    new OrderCreatedPublisher(natsWrapper.client).publish({
        id: order.id,
        status: order.status,
        userId: order.userId,
        expiresAt: expiration.toISOString(),
        version: order.version,
        ticket: {
            id: ticket.id,
            price: ticket.price,
        }
    })
    return res.status(StatusCodes.CREATED).json(order);
}

export default createOrder;
