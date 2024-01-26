import { User } from './types/user';

declare module 'express-serve-static-core' {
    export interface Request {
        session?: {
            token: string;
        }
        user: User | null
    }
}
export {}
