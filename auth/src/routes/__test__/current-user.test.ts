import app from "@/app";
import request from "supertest";


it('should return current user\'s logged in details', async () => {
    const signUpResponse = await request(app).post('/api/users/sign-up').send({
        email: 'test@test.com',
        password: 'password'
    })
    const response = await request(app)
    .get('/api/users/current-user')
    .set('Cookie',signUpResponse.get('Set-Cookie'))
    .expect(200)

    expect(response.body.email).toBe('test@test.com')
})
