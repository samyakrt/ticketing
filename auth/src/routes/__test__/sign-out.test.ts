import app from "@/app";
import request from "supertest";


it('should have set cookie on header after signing out', async () => {
    const signUpCookie = await signIn();

    const res = await request(app)
    .post('/api/users/sign-out')
    .set('Cookie',signUpCookie)
    .expect(200)

    expect(res.get('Set-Cookie')).toBeDefined();
})
