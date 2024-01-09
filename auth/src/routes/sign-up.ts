import { Request, Response } from "express";

const signUp = (req: Request, res: Response) => {
    
    res.send(req.body)
}

export default signUp;
