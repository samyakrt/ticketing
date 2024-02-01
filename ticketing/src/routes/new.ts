import { Request, Response } from "express";

const createTicket = (req: Request, res: Response) => {
    return res.sendStatus(200);
}

export default createTicket;
