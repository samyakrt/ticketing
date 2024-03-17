import { natsWrapper } from '@/nats-wrapper';
import { TicketUpdatedListener } from '../ticket-updated-listener';
import Ticket from '@/model/ticket';
import { TicketUpdatedEvent } from '@ticketing/shared';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';


const setup = async () => {
    const listener = new TicketUpdatedListener(natsWrapper.client);
    const ticket=  Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        price: 20,
        title: 'kon',
    })
    await ticket.save();
    
    const data: TicketUpdatedEvent['data'] = {
        id: ticket.id,
        price: 20,
        title: 'updated',
        userId: new mongoose.Types.ObjectId().toHexString(),
        version: ticket.version + 1
    }

    // @ts-ignore
    const message: Message = {
        ack: jest.fn()
    }
    return {
        listener, 
        data,
        message
    }
}


it('find, updates and saves a ticket', async () => {
    const { data, listener, message } = await setup();

    await listener.onMessage(data,message);

    const ticket = await Ticket.findById(data.id);

    const {userId, version,...rest} = data;
    expect({
        id: ticket?.id,
        title: ticket?.title,
        price: ticket?.price,
    }).toMatchObject(rest)
})

it('acks the message',  async () => {
    const { data, listener, message } = await setup();

    await listener.onMessage(data,message);
    expect(message.ack).toHaveBeenCalled();
})

it('skips the update if version number is mismatched and nats does not acknowledge',  async () => {
    const { data, listener, message } = await setup();

    data.version = 10;
    await listener.onMessage(data,message);
    expect(message.ack).not.toHaveBeenCalled();
})
