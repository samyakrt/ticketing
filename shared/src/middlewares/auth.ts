import { UnauthorizedException } from "../errors";
import { NextFunction, Request, Response } from "express";


const auth = async (req: Request, res: Response, next: NextFunction) => {
    if(!req.user) {
        throw new UnauthorizedException();
    }
    next()
}

export default auth;
