import User from "@/models/user"
import { NextFunction, Request, Response } from "express"
import { ValidationFailedException } from "@ticketing/shared";

const checkIfEmailExists = async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findOne({ email: req.body.email });

    if(user) {
        throw new ValidationFailedException('Duplicate email',{
            email:['Email already used']
        });
    }
    next();
}

export default checkIfEmailExists
