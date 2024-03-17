import { TicketCreatedListener } from "../ticket-created-listener"
import { natsWrapper } from '@/nats-wrapper';
import { TicketCreatedEvent } from "@ticketing/shared";
import { Message } from 'node-nats-streaming';
import mongoose from 'mongoose';
import Ticket from "@/model/ticket";


jest.mock('@/nats-wrapper')
const setup = () => {
    // create a instance of the listener
    const listener = new TicketCreatedListener(natsWrapper.client)
    //  create a fake data event
    const data: TicketCreatedEvent['data'] = {
        id: new mongoose.Types.ObjectId().toHexString(),
        price: 200,
        title: 'konzert',
        userId: new mongoose.Types.ObjectId().toHexString(),
    }
    // create a fake message event
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
it('creates and save ticket', async () => {
    const { data, listener, message} = setup();
    // call onMessage
        await listener.onMessage(data,message)
    // assert to make sure that the ticket was created
    const ticket = await Ticket.findById(data.id);

    const {userId,...rest} = data;
    expect({
        id: ticket!.id,
        price: ticket!.price,
        title: ticket!.title,
    }).toMatchObject(rest)
})

it('acks the message', async () => {
    const { data, listener, message} = setup();
    // call onMessage
    await listener.onMessage(data,message)
    // assert that ack fn is called
    expect(message.ack).toHaveBeenCalled();
})
