import Ticket from "@/models/ticket";
import { Request, Response } from "express";
import mongoose from "mongoose";
import { BadRequestException, NotFoundException } from "shared";

const showTicketDetail = async (req: Request, res: Response) => {
    if (!mongoose.isValidObjectId(req.params.ticketId)) {
        throw new BadRequestException('Invalid object id');
    }
    const ticket = await Ticket.findById(req.params.ticketId)

    if (!ticket) {
        throw new NotFoundException();
    }
    return res.status(200).json(ticket);
}

export default showTicketDetail;
