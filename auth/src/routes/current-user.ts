import { Request, Response } from "express";

const currentUser = (req: Request, res: Response) => {
    return res.json(req.user);
}

export default currentUser;
