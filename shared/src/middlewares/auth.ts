import { UnauthorizedException } from "../errors";
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { User } from "../types/user";

const auth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.session?.token;

    if (!token) {
        throw new UnauthorizedException('Invalid token');
    };
    const user = jwt.verify(token,'sekret100') as User | null; 
    req.user= user;
    next()

}

export default auth;
