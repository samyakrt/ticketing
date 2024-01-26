import httpStatusCodes from 'http-status-codes';
import { CustomException } from './custom-exception';

export class RecordAlreadyExistsException extends CustomException {
    constructor(message: string) {
        super(message,httpStatusCodes.CONFLICT);
    }
}
