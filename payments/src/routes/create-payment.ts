import Order from '@/models/order';
import Payment from '@/models/payment';
import stripe from '@/stripe';
import { BadRequestException, NotFoundException, OrderStatus, UnauthorizedException } from '@ticketing/shared';
import { Request, Response } from 'express';

const createPayment = async (req: Request, res: Response) => {
    const { token, orderId } = req.body;
    const order = await Order.findById(orderId);
    if (!order) {
        throw new NotFoundException('Order not found');
    }

    if(order.userId !== req.user.id) {
        throw new UnauthorizedException();
    }

    if(order.status === OrderStatus.Cancelled) {
        throw new BadRequestException('Cannot pay for an cancelled order');
    }
    const stripeCharge = await stripe.charges.create({
        currency: 'usd',
        amount: order.price * 100,
        source: token,
    });

    const payment = Payment.build({
        orderId: order.id,
        stripeId: stripeCharge.id
    });

    await payment.save();

    return res.status(204).json({});
};

export default createPayment;
