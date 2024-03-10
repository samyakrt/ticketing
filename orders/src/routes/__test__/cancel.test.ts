import app from '@/app';
import Order from '@/model/order';
import Ticket from '@/model/ticket';
import { OrderStatus } from '@ticketing/shared';
import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import { natsWrapper } from '@/nats-wrapper';

jest.mock('@/nats-wrapper')

it('throws an error if payment is not order status', async () => {
    const ticket = Ticket.build({ price: 20, title: 'test' });
    await ticket.save();
    const userSession = globalThis.signIn();
    await request(app).post('/api/orders').set('Cookie', userSession).send({
        ticketId: ticket.id
    })
    const order = await Order.findOne();

    if (order) {
        order.status = OrderStatus.Complete;
        await order.save();

        const res = await request(app).patch(`/api/orders/${order.id}`).set('Cookie', userSession).send();
        expect(res.statusCode).toBe(StatusCodes.FORBIDDEN)
    }
})

it('updates order status', async () => {
    const ticket = Ticket.build({ price: 20, title: 'test' });
    await ticket.save();
    const userSession = globalThis.signIn();
    await request(app).post('/api/orders').set('Cookie', userSession).send({
        ticketId: ticket.id
    })

    const { body: [order] } = await request(app).get('/api/orders').set('Cookie', userSession).send()

    const res = await request(app).patch(`/api/orders/${order.id}`).set('Cookie', userSession).send();
    expect(res.statusCode).toBe(StatusCodes.NO_CONTENT)

    const { body: [updatedOrder] } = await request(app).get('/api/orders').set('Cookie', userSession).send();
    expect(updatedOrder.status).toBe(OrderStatus.Cancelled)
    expect(natsWrapper.client.publish).toHaveBeenCalledTimes(2)

})

// it.todo('emits an order cancelled event')
