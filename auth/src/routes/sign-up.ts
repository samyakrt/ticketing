import User from "@/models/user";
import { SignUpPayload } from "@/schemas/sign-up-schema";
import { Request, Response } from "express";

const signUp = async (req: Request<unknown,unknown, SignUpPayload>, res: Response) => {
    
    const user = User.build({ email: req.body.email,password: req.body.password });
    await user.save();
    return res.json({
        mesage: 'User added successfully.'
    })
}

export default signUp;
