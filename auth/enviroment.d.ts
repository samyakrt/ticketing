import { UserDoc, UserModel } from "@/models/user"

declare module 'express-serve-static-core' {
    export interface Request {
        session?: {
            token?: string
        }
        user: UserDoc;
    }
}

export {}
