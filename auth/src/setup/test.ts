import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '@/app';
import mongoose from 'mongoose';

let mongod: MongoMemoryServer;
beforeAll( async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.connect(uri,{})
})

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();
    for await (const collection of collections) {
            await collection.deleteMany();
    }
});

afterAll(async () => {
    await mongod.stop();
    mongoose.connection.close();
})

it('runs',() => {
    expect(2).toBe(2)
})
