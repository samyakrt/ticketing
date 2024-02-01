import { CustomException } from "./custom-exception";
import httpStatusCodes from 'http-status-codes';

export class UnauthorizedException extends CustomException {    
    constructor(message= 'Unauthorized') {
        super(message,httpStatusCodes.UNAUTHORIZED);
    }
}
