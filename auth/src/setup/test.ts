import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '@/app';
import mongoose from 'mongoose';
import request from 'supertest';


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

it('runs',() => expect(2).toBe(2))

declare global {
    var signIn: () => Promise<string[]>;
  }

global.signIn = async () => {
    const email = 'test@test.com';
    const password = 'password';

    const response =await request(app)
    .post('/api/users/sign-up')
    .send({
        email,
        password
    }).expect(201);
    
    return response.get('Set-Cookie')
}
