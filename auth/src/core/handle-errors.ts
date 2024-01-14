import { NextFunction, Request, Response } from "express";
import { CustomException, ValidationFailedException } from "./exceptions";
import httpStatusCodes from 'http-status-codes';
import { ExtractedErrorsType } from "./types/error";

interface JsonResponse {
    message: string;
    errors?: ExtractedErrorsType;
}

const handleErrors = (err :Record<keyof JsonResponse,string & ExtractedErrorsType>, req: Request, res: Response, next: NextFunction) => {
    const status = err instanceof CustomException ? err.httpStatus : httpStatusCodes.INTERNAL_SERVER_ERROR;

    let payload:JsonResponse = {  message: err.message}

    if(err instanceof ValidationFailedException) {
        payload.errors = err.errors;
    }
    res.status(status).json(payload)
}

export default handleErrors;
