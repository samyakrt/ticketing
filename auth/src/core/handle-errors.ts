import { NextFunction, Request, Response } from "express";
import { CustomError, ValidationFailedError } from "./exceptions";
import httpStatusCodes from 'http-status-codes';
import { ExtractedErrorsType } from "./types/error";

interface JsonResponse {
    message: string;
    errors?: ExtractedErrorsType;
}

const handleErrors = (err :Record<keyof JsonResponse,string & ExtractedErrorsType>, req: Request, res: Response, next: NextFunction) => {
    const status = err instanceof CustomError ? err.httpStatus : httpStatusCodes.INTERNAL_SERVER_ERROR;

    let payload:JsonResponse = {  message: err.message}

    if(err instanceof ValidationFailedError) {
        payload.errors = err.errors;
    }
    res.status(status).json(payload)
}

export default handleErrors;
