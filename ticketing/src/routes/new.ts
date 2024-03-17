import Ticket from "@/models/ticket";
import { Request, Response } from "express";
import { TicketCreatedPublisher } from '@/events';
import { natsWrapper } from '@/nats-wrapper'

const createTicket = async (req: Request, res: Response) => {
    const ticket = Ticket.build({
        price: req.body.price,
        title: req.body.title,
        userId: req.user.id,
    })
    await ticket.save();

    await new TicketCreatedPublisher(natsWrapper.client).publish({
        id: ticket.id,
        title: ticket.title,
        price: ticket.price,
        userId: ticket.userId,
    })
    return res.status(201).json(ticket);
}

export default createTicket;
