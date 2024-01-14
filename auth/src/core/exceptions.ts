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

export class BadRequestException extends CustomException {

    constructor(message: string){
        super(message);
    }
}

export class UnauthorizedException extends CustomException {
    
    constructor(message: string) {
        super(message,httpStatusCodes.UNAUTHORIZED);
    }
}

export class ValidationFailedException extends CustomException {
    constructor(message: string, public errors: {[key: string]: string[]} ) {
        super(message, httpStatusCodes.UNPROCESSABLE_ENTITY);
    }
}

export class RecordAlreadyExistsException extends CustomException {
    constructor(message: string) {
        super(message,httpStatusCodes.CONFLICT);
    }
}
