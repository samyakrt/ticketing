import env from "@/core/env";
import { BadRequestException } from "@ticketing/shared"
import Password from "@/core/helpers/password"
import User from "@/models/user"
import { SignUpPayload } from "@/schemas/sign-up-schema"
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';

const signIn = async (req: Request<unknown, SignUpPayload>, res: Response) => {
    const user = await User.findOne({
        email: req.body.email
    });

    if(!user) {
        throw new BadRequestException('Email not found');
    }

    const doesPwdMatch =await Password.compare(req.body.password,user.password) 
    if(!doesPwdMatch) {
        throw new BadRequestException('Invalid credentials');
    }

    const token = jwt.sign({
        id: user.id,
        email: user.email
    },env.JWT_SECRET)

    req.session = {
        token
    }

    return res.json({
        user
    })
}

export default signIn
