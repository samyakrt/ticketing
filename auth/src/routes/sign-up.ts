import env from "@/core/env";
import User from "@/models/user";
import { SignUpPayload } from "@/schemas/sign-up-schema";
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import httpStatusCodes from 'http-status-codes';

const signUp = async (req: Request<unknown, unknown, SignUpPayload>, res: Response) => {

    const user = User.build({ email: req.body.email, password: req.body.password });
    await user.save();

    const token = jwt.sign({
        id: user.id,
        email: user.email
    }, env.JWT_SECRET);

    req.session = {
        token
    };
    return res.status(httpStatusCodes.CREATED).json({
        user,
        mesage: 'User added successfully.'
    })
}

export default signUp;
