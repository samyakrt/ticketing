import { UserModel } from "@/models/user"
import { User } from "@ticketing/shared/src/types/user";

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
