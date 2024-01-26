import { cleanEnv, str } from 'envalid';

const env = cleanEnv(process.env,{
    JWT_SECRET: str({
        default:'sekret100'
    })
})

export default env
