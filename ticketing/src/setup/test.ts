import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '@/app';
import mongoose from 'mongoose';
import request from 'supertest';
import jwt from 'jsonwebtoken';

let mongod: MongoMemoryServer;
const secret = 'sekret100';
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
    var signIn: () => string[];
  }

global.signIn = () => {
    const payload = {
        id:'1234',
        email: 'test@test.com'
    };
    const token = jwt.sign(payload,secret!)
    const sessionJson = JSON.stringify({ token: token})
    const session = Buffer.from(sessionJson).toString('base64');
    
    return [`session=${session}`];
}
