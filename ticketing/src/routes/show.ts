import Ticket from "@/models/ticket";
import { Request, Response } from "express";
import mongoose from "mongoose";
import { BadRequestException, NotFoundException } from "@ticketing/shared";

const showTicketDetail = async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.ticketId)

    return res.status(200).json(ticket);
}

export default showTicketDetail;
