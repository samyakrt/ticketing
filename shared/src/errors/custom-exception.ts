import httpStatusCodes from 'http-status-codes';

export abstract class CustomException extends Error {
    public readonly httpStatus = httpStatusCodes.BAD_REQUEST;

    constructor(message: string, httpStatus?: number){ 
        super(message);

        if(httpStatus) {
            this.httpStatus = httpStatus;
        }
    }
}

