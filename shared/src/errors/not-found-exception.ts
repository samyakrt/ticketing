import { CustomException } from "./custom-exception";
import httpStatusCodes from 'http-status-codes';

export class NotFoundException extends CustomException {
    public readonly httpStatus = httpStatusCodes.BAD_REQUEST;
    
    constructor(message = 'URL not found'){
        super(message);
    }
}
