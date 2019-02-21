const request = require('supertest');
const server = require('./server.js');
const db = require('../data/dbConfig');

describe('the route handlers', () => {
    describe('get /', () => {
        it('responds with 200', async () => {
            const response = await request(server).get('/');
            expect(response.status).toBe(200);
        });

        it('responds with JSON', async () => {
            const response = await request(server).get('/');
            expect(response.type).toMatch(/json/i);
        });

        it('sends correct response object', async () => {
            const response = await request(server).get('/');
            expect(response.body).toEqual({ api: 'up' });
        })
    });

    describe('get /hobbits', () => {
        it('responds with 200', async () => {
            const response = await request(server).get('/hobbits');
            expect(response.status).toBe(200);
        });

        it('responds with JSON', async () => {
            const response = await request(server).get('/hobbits');
            expect(response.type).toMatch(/json/i);
        });

        it('sends correct response object', async () => {
            const response = await request(server).get('/hobbits');
            expect(response.body).toEqual([]); //testDB does not have data in it
        });
    });

    describe('post to /hobbits', () => {

        afterEach(async () => {
            await db('hobbits').truncate();
        })

        it('responds with 201', async () => {
            body = { name: 'bilbo' }
            const response = await request(server).post('/hobbits').send(body);
            expect(response.status).toBe(201);
        });

        it('responds with 400 when missing body data', async () => {
            body = {}
            const response = await request(server).post('/hobbits').send(body);
            expect(response.status).toBe(400);
        });
    })
});