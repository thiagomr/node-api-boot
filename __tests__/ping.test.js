const request = require('supertest');
const Server = require('../src/server');
const server = new Server();

it('should return pong', async() => {
    const res = await request(server.app).get('/v1/ping');

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('pong');
});
