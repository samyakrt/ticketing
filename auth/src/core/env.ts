import { cleanEnv, str } from 'envalid';

const env = cleanEnv(process.env,{
    jwtSecret: str({
        default:'sekret100'
    })
})

export default env
