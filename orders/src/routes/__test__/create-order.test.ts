import app from "@/app";
import request from 'supertest';
import httpStatusCodes from 'http-status-codes';
import Ticket from "@/model/ticket";
import mongoose from "mongoose";

describe('handler error', () => {
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


    it('throws error if ticketId is invalid', async () => {

        const res = await request(app)
            .post('/api/orders')
            .set('Cookie', globalThis.signIn())
            .send({
                ticketId: new mongoose.Types.ObjectId()
            })
        expect(res.statusCode).toBe(httpStatusCodes.NOT_FOUND);
    })
})

describe('Route handler', () => {
    
    it('creates new order', async () => {
        const ticket = Ticket.build({ price: 10, title: 'amsterdam' });
        await ticket.save();

        const res = await request(app)
            .post('/api/orders')
            .set('Cookie', globalThis.signIn())
            .send({
                ticketId: ticket.id
            })
        expect(res.statusCode).toBe(httpStatusCodes.CREATED);
    })
})
