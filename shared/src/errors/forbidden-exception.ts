import { CustomException } from "./custom-exception";
import httpStatusCode from 'http-status-codes';

export class ForbiddenException extends CustomException {
    readonly  httpStatus: number = httpStatusCode.FORBIDDEN;

    constructor(message: string) {
        super(message);
    }
}
