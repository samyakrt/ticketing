import app from '@/app';
import Ticket from '@/models/ticket';
import mongoose from 'mongoose';
import request from 'supertest';
import { natsWrapper } from '@/nats-wrapper';

const createTicket = async () => {

    const body = {
        title: 'hello',
        price: 20
    }
    const cookie = globalThis.signIn();
    await request(app).post('/api/tickets').set('Cookie', cookie).send(body)
    return cookie; 
}

it('throws 401 error is cookie is not provided', () => {
    request(app).patch('/api/tickets/1234').send().expect(401)
})

it('returns validation error if title or price is invalid', async () => {
    const cookie = await createTicket()
    const [ticket] = await Ticket.find()

    request(app).patch('/api/tickets' + ticket._id.toString()).set('Cookie', cookie).send().expect(422)

    request(app).patch('/api/tickets' + ticket._id.toString()).set('Cookie', cookie).send({
        title: '',
        price: 20
    }).expect(422)


    request(app).patch('/api/tickets' + ticket._id.toString()).set('Cookie', cookie).send({
        title: 'asd',
        price: -20
    }).expect(422)

})
it('throws 400 error when invalid object id is provided', async () => {
    request(app).get('/api/tickets/asdasd').set('Cookie', globalThis.signIn()).send().expect(400)

})

it('should throw 404 error when  unknown object id is provided', async () => {
    const objectId = new mongoose.Types.ObjectId();
    request(app).get('/api/tickets/' + objectId).set('Cookie', globalThis.signIn()).send().expect(404)
})


it('throws 403 error if user is not the author',  async () => {

    await createTicket();
    const [ticket] = await Ticket.find();

    const body = {
        title: 'updated',
        price: 300
    }
    const res1 = await request(app).patch('/api/tickets/' + ticket._id.toString()).set('Cookie', globalThis.signIn()).send(body)
    expect(res1.status).toBe(403);
})

it('should update ticket', async () => {
    const cookie = await createTicket();

    const [ticket] = await Ticket.find();

    const body = {
        title: 'updated',
        price: 300
    }
    const res1 = await request(app).patch('/api/tickets/' + ticket._id.toString()).set('Cookie', cookie).send(body)
    expect(res1.status).toBe(200);

    const res = await request(app).get('/api/tickets/' + ticket._id.toString()).set('Cookie',cookie).send();
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe(body.title)
    expect(res.body.price).toBe(body.price)
})


it('publishes an event', async () => {
    const cookie = await createTicket();

    const [ticket] = await Ticket.find();

    const body = {
        title: 'updated',
        price: 300
    }
    const res1 = await request(app).patch('/api/tickets/' + ticket._id.toString()).set('Cookie', cookie).send(body)
    expect(res1.status).toBe(200);
    expect(natsWrapper.client.publish).toHaveBeenCalledTimes(2)

})

it('throws error if ticket is reserved', async() => {
    
    const cookie = await createTicket();
    const [ticket] = await Ticket.find();

    await ticket.set({orderId: new mongoose.Types.ObjectId().toHexString()}).save()
    const body = {
        title: 'updated',
        price: 300
    }
    const res1 = await request(app).patch('/api/tickets/' + ticket._id.toString()).set('Cookie', cookie).send(body)

    expect(res1.statusCode).toBe(400)
})
