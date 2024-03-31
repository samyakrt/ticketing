import { cleanEnv, str } from 'envalid';

const env = cleanEnv(process.env,{
    MONGODB_URI: str(),
    NATS_URL: str(),
    NATS_CLUSTER_ID: str(),
    NATS_CLIENT_ID: str(),
    STRIPE_PUBLIC_KEY: str(),
    STRIPE_SECRET_KEY: str()
})

export default env;
