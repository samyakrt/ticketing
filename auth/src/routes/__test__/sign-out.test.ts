import app from "@/app";
import request from "supertest";


it('should have set cookie on header after signing out', async () => {
    const signUpResponse = await request(app).post('/api/users/sign-up').send({
        email: 'test@test.com',
        password: 'password'
    });

    const res = await request(app)
    .post('/api/users/sign-out')
    .set('Cookie',signUpResponse.get('Set-Cookie'))
    .expect(200)

    expect(res.get('Set-Cookie')).toBeDefined();
})
