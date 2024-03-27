import env from '@/env';
import { Queue, Worker } from 'bullmq';
import { jobName } from './job-name';

interface Payload {
    orderId: string;
}

export const expirationQueue = new Queue<Payload>('order:expiration', {
    connection: {
        host: env.REDIS_URI,
        port: env.REDIS_PORT
    }
})


