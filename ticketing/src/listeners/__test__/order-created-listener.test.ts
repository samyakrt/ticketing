import Ticket from "@/models/ticket";
import { OrderCreatedListener } from "../order-created-listener"
import { natsWrapper } from '@/nats-wrapper';
import mongoose from 'mongoose';
import { OrderCreatedEvent, OrderStatus } from "@ticketing/shared";
import { Message} from 'node-nats-streaming';

const setup = async () => {
    // Create an instance of listener
    const listener = new OrderCreatedListener(natsWrapper.client);
    const ticket = Ticket.build({
        price: 20,
        title: 'test',
        userId: new mongoose.Types.ObjectId().toHexString()
    })    

    await ticket.save();
    const data: OrderCreatedEvent['data'] = {
        id: new mongoose.Types.ObjectId().toHexString(),
        version: 0,
        status: OrderStatus.Created,
        expiresAt: new Date().toISOString(),
        userId:new mongoose.Types.ObjectId().toHexString(),
        ticket: {
            id: ticket.id,
            price: ticket.price
        }
    }

    // @ts-ignore
    const message: Message = {
        ack: jest.fn()
    }

    return {
        message,
        data,
        listener,
        ticket
    }
}

it('sets the userId of the ticket', async () => {
    const {data, listener, message, ticket} = await setup();

    await listener.onMessage(data,message);

    const updatedTicket = await Ticket.findById(ticket.id);
    
    expect(updatedTicket?.orderId).toBe(data.id)
    expect(message.ack).toHaveBeenCalled()
})

it('publishes an ticket updated event',async () => {
    const {data, listener, message, ticket} = await setup();

    await listener.onMessage(data,message);
    expect(natsWrapper.client.publish).toHaveBeenCalled(); 
    const publishedPayload = JSON.parse((natsWrapper.client.publish as jest.Mock).mock.calls[0][1]);

    expect(ticket.id).toBe(publishedPayload.id)
})
