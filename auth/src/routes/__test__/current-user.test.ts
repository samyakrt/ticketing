import app from "@/app";
import request from "supertest";


it('should return current user\'s logged in details', async () => {
    const cookie = await globalThis.signIn();
    const response = await request(app)
    .get('/api/users/current-user')
    .set('Cookie',cookie)
    .expect(200)

    expect(response.body.email).toBe('test@test.com')
})

it('should throw unauthorized error when cookie is not provided', async () => {
    await request(app)
    .get('/api/users/current-user')
    .expect(401)
})
