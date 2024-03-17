import Ticket from "@/models/ticket";
import { OrderCancelledListener } from "../order-cancelled-listener"
import { natsWrapper } from '@/nats-wrapper';
import mongoose from 'mongoose';
import { OrderCancelledEvent } from "@ticketing/shared";
import { Message } from 'node-nats-streaming';

const setup = async () => {

    const listener = new OrderCancelledListener(natsWrapper.client);

    const orderId = new mongoose.Types.ObjectId().toHexString();

    const ticket = Ticket.build({
        title: 'concert',
        price: 20,
        userId: new mongoose.Types.ObjectId().toHexString(),
    });

    ticket.set({orderId});
    await ticket.save();

    const data: OrderCancelledEvent['data'] = {
        id: orderId,
        version: 0,
        ticket: {
            id: ticket.id
        }
    }

    // @ts-ignore
    const message: Message = {
        ack: jest.fn()
    }

    return {
        message,
        data,
        ticket,
        orderId,
        listener
    }
}


it('updates the ticket, publishes an event and acks the message', async () => {
    const {data, listener, message, orderId, ticket }= await setup();
    await listener.onMessage(data,message);

    const updatedTicket = await Ticket.findById(ticket.id);

    expect(message.ack).toHaveBeenCalled()
    expect(updatedTicket?.orderId).not.toBeDefined()
    expect(natsWrapper.client.publish).toHaveBeenCalled()
})
