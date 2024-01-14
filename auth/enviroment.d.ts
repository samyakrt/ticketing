import { UserDoc, UserModel } from "@/models/user"

declare global {
    namespace Express {
        interface Request {
        session?: {
            token?: string
        } | null
        user: UserDoc;            
        }
    }
}
