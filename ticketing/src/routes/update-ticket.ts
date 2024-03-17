import Ticket from "@/models/ticket";
import { Request, Response } from "express";
import { BadRequestException, ForbiddenException, NotFoundException } from "@ticketing/shared";
import { natsWrapper } from '@/nats-wrapper';
import { TicketUpdatedPublisher } from "@/events";

const updateTicket = async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.ticketId);
    if(req.user.id !== ticket?.userId) {
        throw new ForbiddenException('permission denied');
    }

    if(!ticket) {
        throw new NotFoundException('Ticket not found')
    }

    if(ticket.orderId) {
        throw new BadRequestException('Cannot edit a reserved ticket');
    }

    if(ticket.userId !== req.user.id) {
        throw new ForbiddenException('forbidden');
    }
    ticket.title = req.body.title;
    ticket.price = req.body.price;
    await ticket.save();
    await new TicketUpdatedPublisher(natsWrapper.client).publish({
        id: ticket.id,
        price: ticket.price,
        title: ticket.title,
        userId: ticket.userId,
        version: ticket.version,
    });
    return res.json();
}

export default updateTicket;
