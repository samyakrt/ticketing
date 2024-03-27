import { cleanEnv, str } from 'envalid';

const env = cleanEnv(process.env,{
    MONGODB_URI: str(),
    NATS_URL: str(),
    NATS_CLUSTER_ID: str(),
    NATS_CLIENT_ID: str()     
})

export default env;
