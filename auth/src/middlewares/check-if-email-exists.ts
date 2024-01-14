import { RecordAlreadyExistsError } from "@/core/exceptions";
import User from "@/models/user"
import { NextFunction, Request, Response } from "express"

const checkIfEmailExists = async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findOne({ email: req.body.email });

    if(user) {
        throw new RecordAlreadyExistsError('Email already exists');
    }
    next();
}

export default checkIfEmailExists
