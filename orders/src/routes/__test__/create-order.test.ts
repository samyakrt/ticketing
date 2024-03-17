import app from "@/app";
import request from 'supertest';
import httpStatusCodes, { StatusCodes } from 'http-status-codes';
import Ticket from "@/model/ticket";
import mongoose from "mongoose";
import { OrderStatus } from "@ticketing/shared";
import Order from "@/model/order";
import { natsWrapper } from '@/nats-wrapper';

jest.mock('@/nats-wrapper')

describe('validations', () => {
    it('throws error if ticketId is not provided', async () => {
        const res = await request(app)
            .post('/api/orders')
            .set('Cookie', globalThis.signIn())
            .send()
        expect(res.statusCode).toBe(httpStatusCodes.UNPROCESSABLE_ENTITY)
    });


    it('throws error if ticketId is invalid object id is provided', async () => {
        const res = await request(app)
            .post('/api/orders')
            .set('Cookie', globalThis.signIn())
            .send({
                ticketId: 'asd'
            })
        expect(res.statusCode).toBe(httpStatusCodes.UNPROCESSABLE_ENTITY)
    })
})

describe('Route handler', () => {
    it('throws error if ticketId is not found', async () => {

        const res = await request(app)
            .post('/api/orders')
            .set('Cookie', globalThis.signIn())
            .send({
                ticketId: new mongoose.Types.ObjectId()
            })
        expect(res.statusCode).toBe(httpStatusCodes.NOT_FOUND);
    })
    it('throws error if the ticket is already reserved', async () => {
        const ticket = Ticket.build({ 
            id: new mongoose.Types.ObjectId().toHexString(),
            price: 10, title: 'amsterdam' });
        await ticket.save();

        const order = Order.build({
            status: OrderStatus.Created,
            expiresAt: new Date(),
            ticket,
            userId: 'asd'
        })
        await order.save();

        const res = await request(app)
            .post('/api/orders')
            .set('Cookie', globalThis.signIn())
            .send({
                ticketId: ticket._id
            })
        expect(res.statusCode).toBe(StatusCodes.FORBIDDEN)
    })
    it('creates new order', async () => {
        const ticket = Ticket.build({id: new mongoose.Types.ObjectId().toHexString(), price: 10, title: 'amsterdam' });
        await ticket.save();

        const res = await request(app)
            .post('/api/orders')
            .set('Cookie', globalThis.signIn())
            .send({
                ticketId: ticket.id
            })
        expect(natsWrapper.client.publish).toHaveBeenCalledTimes(1)
        expect(res.statusCode).toBe(httpStatusCodes.CREATED);
    })

})
