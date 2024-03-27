import { cleanEnv, num, str } from 'envalid';

const env = cleanEnv(process.env,{
    REDIS_URI: str(),
    REDIS_PORT: num({ default: 6379}),
    NATS_URL: str(),
    NATS_CLUSTER_ID: str(),
    NATS_CLIENT_ID: str()     
})
console.log(env)

export default env;
