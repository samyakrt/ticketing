import { OrderCancelledEvent, OrderCreatedEvent, OrderStatus } from "@ticketing/shared";
import { natsWrapper } from '@/nats-wrapper';
import mongoose, { mongo } from 'mongoose';
import { Message } from 'node-nats-streaming';
import Order from "@/models/order";
import { OrderCancelledListener } from "../order-cancelled-listener";

const setup = async () => {
    const listener = new OrderCancelledListener(natsWrapper.client)

    const order = Order.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        price: 20,
        status: OrderStatus.Created,
        userId: 'asd',
        version: 0
    })
    await order.save();
    const data: OrderCancelledEvent['data'] = {
        id: order.id,
        ticket: {
            id: new mongoose.Types.ObjectId().toHexString(),
        },
        version: 1
    };

    // @ts-ignore
    const message: Message = {
        ack: jest.fn()
    };

    return {
        listener,
        data,
        message,
        order
    }
}

it('cancels the order', async () => {
    const { data, listener, message, order } = await setup();
    await listener.onMessage(data, message);

    const updatedOrder = await Order.findById(order.id);
    expect(updatedOrder?.status).toEqual(OrderStatus.Cancelled)
})

it('acks the message', async () => {
    const { data, listener, message } = await setup();
    await listener.onMessage(data, message);

    expect(message.ack).toHaveBeenCalled();

})
