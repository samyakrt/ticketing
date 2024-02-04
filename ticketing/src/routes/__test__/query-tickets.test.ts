import app from '@/app';
import request from 'supertest';
import range  from 'lodash/range';

const createTicket = () => {

    const body = {
        title: 'hello',
        price: 20
    }
    return request(app).post('/api/tickets').set('Cookie', globalThis.signIn()).send(body)
} 
it('returns 200 with lists of tickets', async () => {
    const maxRange = 4;
    await Promise.all(range(0,maxRange).map(() => createTicket()));

    const res = await request(app).get('/api/tickets').set('Cookie',globalThis.signIn()).send().expect(200)    

    expect(res.body.tickets).toBeDefined();
    expect(res.body.tickets.length).toEqual(maxRange)
})
