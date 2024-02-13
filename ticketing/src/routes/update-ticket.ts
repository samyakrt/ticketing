import Ticket from "@/models/ticket";
import { Request, Response } from "express";
import { ForbiddenException, NotFoundException, UnauthorizedException } from "@ticketing/shared";

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

    return res.json();
}

export default updateTicket;
