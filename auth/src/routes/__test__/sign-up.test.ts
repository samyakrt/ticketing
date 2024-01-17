import request from 'supertest';
import app from '@/app';

it('returns 201 on successful signup', () => {
    return request(app).post('/api/users/sign-up')
    .send({
        email: 'test@test.com',
        password: 'password'
    }).expect(201)
})

it('returns 400 on invalid email', () => {
    return request(app).post('/api/users/sign-up')
    .send({
        email: 'test',
        password: 'password'
    }).expect(422)
})


it('returns 400 on invalid password', async () => {
    return request(app).post('/api/users/sign-up')
    .send({
        email: 'test@test.com',
        password: 'pas'
    }).expect(422).then(res => {
        expect(res.body).toEqual({
            message: 'validation failed',
            errors: {
                password: ["should contain at least 4 characters"]
            }
        })
    })
})

it('throw error on duplicate email', async () => {
    await request(app).post('/api/users/sign-up')
    .send({
        email: 'test@test.com',
        password: 'password'
    }).expect(201)

    await request(app).post('/api/users/sign-up')
    .send({
        email: 'test@test.com',
        password: 'password'
    }).expect(409)
})

