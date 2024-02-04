import Ticket from "@/models/ticket";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { BadRequestException, NotFoundException } from "shared";

const isValidTicket = async (req: Request, res: Response,next: NextFunction ) => {
    if (!mongoose.isValidObjectId(req.params.ticketId)) {
        throw new BadRequestException('Invalid object id');
    }
    const ticket = await Ticket.findById(req.params.ticketId)

    if (!ticket) {
        throw new NotFoundException();
    }
    next();
}
export default isValidTicket;
