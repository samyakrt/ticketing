import httpStatusCodes from 'http-status-codes';

export abstract class CustomError extends Error {
    public readonly httpStatus = httpStatusCodes.BAD_REQUEST;

    constructor(message: string, httpStatus?: number){ 
        super(message);

        if(httpStatus) {
            this.httpStatus = httpStatus;
        }
    }
}

export class ValidationFailedError extends CustomError {
    constructor(message: string, public errors: {[key: string]: string[]} ) {
        super(message, httpStatusCodes.UNPROCESSABLE_ENTITY);
    }
}

export class RecordAlreadyExistsError extends CustomError {
    constructor(message: string) {
        super(message,httpStatusCodes.CONFLICT);
    }
}
