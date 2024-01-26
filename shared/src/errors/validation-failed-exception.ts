import httpStatusCodes from 'http-status-codes';
import { CustomException } from './custom-exception';

export class ValidationFailedException extends CustomException {
    constructor(message: string, public errors: { [key: string]: string[] }) {
        super(message, httpStatusCodes.UNPROCESSABLE_ENTITY);
    }
}
