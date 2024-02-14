import app from '@/app';
import Ticket from '@/models/ticket';
import request from 'supertest';

jest.mock('../../__mocks__/nats-wrapper')

it('has a route handler listening to /api/tickets for post request', async () => {
    const response = await request(app).post('/api/tickets').send({})

    expect(response.status).not.toBe(404)
})

it('can only be accessed if the user is signed in', async () => {
    const response = await request(app).post('/api/tickets').send({}).expect(401)
    expect(response.status).toBe(401)
})
it('returns  a status other than 401 if user is signed in', async () => {
    const response = await request(app).post('/api/tickets').set('Cookie', globalThis.signIn()).send({})
    expect(response.status).not.toBe(401)
})
it('returns an error if invalid title is provided', async () => {
    const response = await request(app).post('/api/tickets').set('Cookie', globalThis.signIn()).send({
        title: '',
        price: 10
    })
    expect(response.body.errors.title).toContain('please provide title')

    expect(response.status).toBe(422)

})
it('returns an error if invalid price is provided', async () => {
    const response = await request(app).post('/api/tickets').set('Cookie', globalThis.signIn()).send({
        title: 'hello',
        price: -10
    })

    expect(response.status).toBe(422)
    expect(response.body.errors.price).toContain('must be positive')
})
it('creates a ticket if valid input is provided', async () => {
    const body = {
        title: 'hello',
        price: 20
    }
     const res = await request(app).post('/api/tickets').set('Cookie', globalThis.signIn()).send(body);

     expect(res.statusCode).toBe(201)
     const tickets = await Ticket.find({})
     expect(tickets.length).toBe(1)
     expect(tickets[0].title).toBe(body.title);
     expect(tickets[0].id).toBeDefined();
     expect(tickets[0].price).toBe(body.price);
})
