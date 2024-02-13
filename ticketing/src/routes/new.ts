import Ticket from "@/models/ticket";
import { Request, Response } from "express";
import { TicketCreatedPublisher } from '@/events';

const createTicket = async (req: Request, res: Response) => {
    const ticket = Ticket.build({
        price: req.body.price,
        title: req.body.title,
        userId: req.user.id,
    })
    await ticket.save();
    return res.sendStatus(201);
}

export default createTicket;
