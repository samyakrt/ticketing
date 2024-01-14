import { Request, Response } from "express";

const signOut = (req: Request, res: Response) => {
    req.session = null;
    return res.json({})
}

export default signOut;
