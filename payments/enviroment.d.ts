import { User } from "@ticketing/shared";

declare global {
    namespace Express {
        interface Request {
        session?: {
            token?: string
        } | null
        user: User;          
        }
    }
}
