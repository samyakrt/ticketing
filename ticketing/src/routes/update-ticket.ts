import Ticket from "@/models/ticket";
import { Request, Response } from "express";
import { ForbiddenException, NotFoundException, UnauthorizedException, natsWrapper } from "@ticketing/shared";
import { TicketUpdatedPublisher } from "@/events";

const updateTicket = async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.ticketId);
    if(req.user.id !== ticket?.userId) {
        throw new ForbiddenException('permission denied');
    }

    if(!ticket) {
        throw new NotFoundException('Ticket not found')
    }

    ticket.title = req.body.title;
    ticket.price = req.body.price;
    await ticket.save();
    await new TicketUpdatedPublisher(natsWrapper.client).publish({
        id: ticket.id,
        price: ticket.price,
        title: ticket.title,
        userId: ticket.userId
    });
    return res.json();
}

export default updateTicket;
