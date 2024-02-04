import Ticket from "@/models/ticket";
import { Request, Response } from "express";

const queryTickets = async (req: Request, res: Response) => {
    const tickets = await Ticket.find();
    return res.json({ tickets });
}
export default queryTickets;
