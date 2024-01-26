import { CustomException } from "./custom-exception";

export class BadRequestException extends CustomException {
    constructor(message: string) {
        super(message);
    }
}
