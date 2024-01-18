import request from 'supertest';
import app from '@/app';

beforeEach(async () => {
    await request(app).post('/api/users/sign-up')
    .send({
        email: 'test@test.com',
        password: 'password'
    }).expect(201)
});
it('should throw error when email doesn\'t exists', async () => {

    
    await request(app).post('/api/users/sign-in')
    .send({
        email: 'test@test.dsd',
        password: 'password'
    }).expect(400)
  })

it('should throw error when invalid password is sent', async () => {
    await request(app).post('/api/users/sign-in')
    .send({
        email: 'test@test.com',
        password: 'password2'
    }).expect(400)
})

it('should set cookie on response header', async () => {
    const response = await request(app).post('/api/users/sign-in')
    .send({
        email: 'test@test.com',
        password: 'password'
    }).expect(200);

    expect(response.get('Set-Cookie')).toBeDefined()
})
