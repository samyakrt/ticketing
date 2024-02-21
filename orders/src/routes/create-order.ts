import Ticket from '@/model/ticket';
import { NotFoundException } from '@ticketing/shared';
import { Request, Response } from 'express';

const createOrder = async (req: Request, res: Response) => {
    const ticket = await Ticket.findOne({ id: req.body.ticketId });
    if(!ticket) {
        throw new NotFoundException('Ticket not found');
    }
    res.json({})
}

export default createOrder;
