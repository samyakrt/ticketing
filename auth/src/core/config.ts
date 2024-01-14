import { cleanEnv, str } from 'envalid';

const config = cleanEnv(process.env,{
    jwtSecret: str({
        default:'sekret100'
    })
})

export default config
