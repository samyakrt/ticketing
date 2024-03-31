import app from '@/app';
import Order from '@/models/order';
import { OrderStatus } from '@ticketing/shared';
import mongoose from 'mongoose';
import request from 'supertest';
import stripe from '@/stripe';
import Payment from '@/models/payment';
import { natsWrapper } from '@/nats-wrapper';

it('throws error if order is not found', async () => {
    const cookie = globalThis.signIn();
    const res = await request(app).post('/api/payments')
        .set('Cookie', cookie)
        .send({
            token: 'asdasd',
            orderId: new mongoose.Types.ObjectId().toHexString(),
        })

    expect(res.status).toBe(404)
})

it('return unauthorized error if user does not match', async () => {
    const cookie = globalThis.signIn();
    const order = Order.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        price: 20,
        status: OrderStatus.Created,
        userId: 'adsasd',
        version: 0
    })

    await order.save();
    const res = await request(app).post('/api/payments')
        .set('Cookie', cookie)
        .send({
            token: 'asdasd',
            orderId: order.id,
        })

    expect(res.statusCode).toBe(401)
})

it('throws bad request if order is already cancelled', async () => {
    const userId = new mongoose.Types.ObjectId().toHexString();
    const cookie = globalThis.signIn(userId);
    const order = Order.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        price: 20,
        status: OrderStatus.Cancelled,
        userId,
        version: 0
    })

    await order.save();
    const res = await request(app).post('/api/payments')
        .set('Cookie', cookie)
        .send({
            token: 'asdasd',
            orderId: order.id,
        })

    expect(res.statusCode).toBe(400)
})

it('return 200 if input is valid', async () => {
    const userId = new mongoose.Types.ObjectId().toHexString();
    const cookie = globalThis.signIn(userId);
    const price = Math.floor((Math.random()) * 100);
    const order = Order.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        price,
        status: OrderStatus.Created,
        userId,
        version: 0
    })

    await order.save();
    const res = await request(app).post('/api/payments')
        .set('Cookie', cookie)
        .send({
            token: 'tok_visa',
            orderId: order.id,
        })

    expect(res.statusCode).toBe(204)
    const stripeCharges = await stripe.charges.list({
        limit: 50
    })
    const charge = stripeCharges.data.find(charge => charge.amount === price * 100)
    expect(charge).toBeDefined();
    expect(charge?.currency).toEqual('usd');

    const payment = await Payment.findOne({
        orderId: order.id,
        stripeId: charge!.id
    })

    expect(payment).not.toBeNull();
    expect(natsWrapper.client.publish).toHaveBeenCalled();
    const publishedPayload = JSON.parse((natsWrapper.client.publish as jest.Mock).mock.calls[0][1]);

    expect(publishedPayload).toMatchObject({
        id: payment?.id,
        orderId: payment?.orderId,
        stripeId: payment?.stripeId
    })
}, 30000)
