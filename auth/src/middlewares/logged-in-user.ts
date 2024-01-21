import env from "@/core/env";
import { UnauthorizedException } from "@/core/exceptions";
import User from "@/models/user";
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

const loggedInUser = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.session?.token;

    console.log(token)
    if (!token) {
        throw new UnauthorizedException('Invalid token');
    }

    const { id } = jwt.verify(token,env.jwtSecret) as { id: string };
    const user = await User.findById(id);

    if(!user) {
        throw new UnauthorizedException('Invalid token');
    }
    req.user = user;
    next()

}

export default loggedInUser;
