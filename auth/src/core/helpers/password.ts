import { compare, hash, genSalt } from 'bcryptjs';

class Password {
    static async toHash(password: string) {
        const salt = await genSalt(8)
        return hash(password,salt);
    }

    static compare(suppliedPassword: string,storedPassword: string) {
        return compare(suppliedPassword,storedPassword);
    }
}

export default Password;
