import { CustomException } from "./custom-exception";
import httpStatusCodes from 'http-status-codes';

export class UnauthorizedException extends CustomException {    
    constructor(message: string) {
        super(message,httpStatusCodes.UNAUTHORIZED);
    }
}
