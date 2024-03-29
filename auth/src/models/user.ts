import Password from "@/core/helpers/password";
import mongoose from "mongoose";

interface UserProps {
    email:string;
    password:string;
}

export interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
    

}
export interface UserModel extends mongoose.Model<UserDoc> {
    build(payload: UserProps): UserDoc;
}

const UserSchema = new mongoose.Schema<UserDoc>({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
}, {
    toJSON: {
        transform(doc, ret, options) {
            return  {
                id: doc.id,
                email: doc.email
            }

        },
    }
})

UserSchema.pre('save',async function(done) {
    if(this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password',hashed)
    }
    done();
})

UserSchema.statics.build = (user: UserProps)  => new User(user);

const User = mongoose.model<UserDoc,UserModel>('users',UserSchema);

export default User;
