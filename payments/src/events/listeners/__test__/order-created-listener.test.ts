import { OrderCreatedEvent, OrderStatus } from "@ticketing/shared";
import { OrderCreatedListener } from "../order-created-listener"
import { natsWrapper } from '@/nats-wrapper';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import Order from "@/models/order";

const setup = () => {
    const listener = new OrderCreatedListener(natsWrapper.client)    

    const data: OrderCreatedEvent['data'] = {
        id: new mongoose.Types.ObjectId().toHexString(),
        version: 0,
        expiresAt:'',
        userId: 'asd',
        status: OrderStatus.Created,
        ticket: {
            id: new mongoose.Types.ObjectId().toHexString(),
            price:20
        }
    };

    // @ts-ignore
    const message: Message = {
        ack: jest.fn()
    };

    return {
        listener,
       data,
       message,
    }
}

it('replicates the order info', async () => {
    const { data, listener, message}  = await setup()
    await listener.onMessage(data,message);
    const order = await Order.findById(data.id);
    expect(data.ticket.price).toEqual(order?.price);
})

it('acks message', async () => {
    const { data, listener, message}  = await setup()
    await listener.onMessage(data,message);

    expect(message.ack).toHaveBeenCalled()
})
