import app from '@/app';
import Ticket from '@/model/ticket';
import mongoose from 'mongoose';
import request from 'supertest';

const buildTicket = async () => {
    const ticket = Ticket.build({ title: 'convert',price: 20})
    await ticket.save();
    return ticket
}

it('fetch orders from different users', async () => {

    const ticketOne = await buildTicket();
    const ticketTwo = await buildTicket();
    const ticketThree = await buildTicket();

    const userOne = globalThis.signIn();
    const userTwo = globalThis.signIn();

    await request(app).post('/api/orders').set('Cookie', userOne).send({
        ticketId: ticketOne._id
    })
    await request(app).post('/api/orders').set('Cookie', userTwo).send({
        ticketId: ticketTwo._id
    });
    await request(app).post('/api/orders').set('Cookie', userTwo).send({
        ticketId: ticketThree._id
    })

    const { body: orderOne} = await request(app).get('/api/orders').set('Cookie',userOne).send() 
    const { body: orderTwo} = await request(app).get('/api/orders').set('Cookie',userTwo).send()
    
    expect(orderOne).toHaveLength(1)
    expect(orderTwo).toHaveLength(2)
    expect(orderOne[0].ticket.id).toEqual(ticketOne.id)
    expect(orderTwo[0].ticket.id).toEqual(ticketTwo.id)
    expect(orderTwo[1].ticket.id).toEqual(ticketThree.id)
})
