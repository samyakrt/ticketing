import app from '@/app';
import Ticket from '@/models/ticket';
import mongoose from 'mongoose';
import request from 'supertest';

it('returns 400 if invalid object id is provided ',async () => {
    const res = await request(app).get('/api/tickets/asdasd').set('Cookie',globalThis.signIn()).send()
    expect(res.statusCode).toBe(400)
})

it('returns 404 if invalid ticket id is provided ',async () => {
    const objectId= new mongoose.Types.ObjectId();
    const res = await request(app).get('/api/tickets/'+objectId).set('Cookie',globalThis.signIn()).send()
    expect(res.statusCode).toBe(404)
})

it('returns the ticket if found', async () => {
    const body = {
        title: 'ktm to pkr',
        price: 40
    }
    const create = await request(app).post('/api/tickets').set('Cookie',globalThis.signIn()).send(body)
    expect(create.statusCode).toBe(201);

    const ticket = await Ticket.findOne(body)
    const res =await request(app).get('/api/tickets/'+ticket?._id.toString()).set('Cookie', globalThis.signIn()).send()

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe(body.title)
    expect(res.body.price).toBe(body.price)
})
