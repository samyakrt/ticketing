import app from '@/app';
import Order from '@/model/order';
import Ticket from '@/model/ticket';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import request from 'supertest';

it('prevent user from accesing other user\'s order', async () => {
    // creates a ticket
    const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        price: 20,
        title: 'ticket'
    });
    await ticket.save();
    const userSession = globalThis.signIn();
    // make request to build an order 
    await request(app).post('/api/orders').set('Cookie', userSession).send({
        ticketId: ticket.id
    })
    const order = (await Order.findOne().populate('ticket'));
    // fetch order
    const res =await request(app).get(`/api/orders/${order?.id}`).set('Cookie',globalThis.signIn()).send();
    expect(res.statusCode).toBe(StatusCodes.UNAUTHORIZED);
});

it('fetches the order', async () => {
    // creates a ticket
    const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        price: 20,
        title: 'ticket'
    });
    await ticket.save();
    const userSession = globalThis.signIn();
    // make request to build an order 
    await request(app).post('/api/orders').set('Cookie', userSession).send({
        ticketId: ticket.id
    })
    const order = (await Order.findOne().populate('ticket'));

    // fetch order
    const res =await request(app).get(`/api/orders/${order?.id}`).set('Cookie',userSession).send();

    expect(res.statusCode).toBe(StatusCodes.OK);
    expect(JSON.parse(JSON.stringify(order))).toMatchObject(res.body)
})
