import { OrderExpirationCompleteListener } from "../order-expiration-complete-listener"
import { natsWrapper } from '@/nats-wrapper';
import Order, { OrderStatus } from '@/model/order';
import Ticket from "@/model/ticket";
import mongoose from "mongoose";
import { ExpirationCompleteEvent } from "@ticketing/shared";
import { Message } from 'node-nats-streaming';
import { OrderCancelledPublisher } from "@/events/order-cancelled-publisher";

const setup = async () => {
    const listener = new OrderExpirationCompleteListener(natsWrapper.client)

    const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        price: 20,
        title: 'concert'
    })

    await ticket.save();


    const order = Order.build({
        status: OrderStatus.Created,
        userId: 'asd',
        ticket,
        expiresAt: new Date()
    });
    await order.save();

    const data: ExpirationCompleteEvent['data'] = {
        orderId: order.id
    }

    // @ts-ignore
    const message: Message = {
        ack: jest.fn()
    }

    return {
        message,
        data,
        listener,
        order,
        ticket,
    }
}

it('updates the order status to cancelled', async() => {
    const { data, listener, message, order, ticket}  = await setup();

    await listener.onMessage(data,message);

    const updatedOrder = await Order.findById(order.id);

    expect(updatedOrder!.status).toBe(OrderStatus.Cancelled)
})

it('emits an orderCancelled event', async () => {
    const { data, listener, message, order, ticket}  = await setup();

    await listener.onMessage(data,message);

    const eventData = JSON.parse((natsWrapper.client.publish as jest.Mock).mock.calls[0][1])

    expect(eventData.id).toEqual(order.id)
})


it('acks the message',  async () => {
    const { data, listener, message, order, ticket}  = await setup();

    await listener.onMessage(data,message);

    expect(message.ack).toHaveBeenCalled()
})
