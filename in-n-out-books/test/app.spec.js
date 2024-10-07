// test/app.spec.js

const request = require('supertest');
const app = require('../src/app');

describe('In-N-Out-Books API', () => {
    let server;

    beforeAll((done) => {
        server = app.listen(0, () => { // Listen on an ephemeral port
            done();
        });
    });

    afterAll((done) => {
        server.close(done); // Close the server after tests
    });

    // Books API Tests
    it('should return an array of books', async () => {
        const response = await request(server).get('/api/books');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('should return a single book by ID', async () => {
        const response = await request(server).get('/api/books/1');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('title');
    });

    it('should return 400 for an invalid book ID', async () => {
        const response = await request(server).get('/api/books/999'); // Ensure 999 is indeed invalid
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'Invalid book ID');
    });

    it('should create a new book', async () => {
        const response = await request(server).post('/api/books').send({ title: 'New Book' });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('title', 'New Book');
    });

    it('should return 400 if title is missing when creating a book', async () => {
        const response = await request(server).post('/api/books').send({});
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'Title is required');
    });

    it('should update a book', async () => {
        const response = await request(server).put('/api/books/1').send({ title: 'Updated Book' });
        expect(response.status).toBe(204);
    });

    it('should return 400 if title is missing in book update', async () => {
        const response = await request(server).put('/api/books/1').send({});
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'Title is required for update');
    });

    it('should delete a book', async () => {
        const response = await request(server).delete('/api/books/1');
        expect(response.status).toBe(204);
    });

    // User Authentication API Tests
    it('should log in a user with correct credentials', async () => {
        const response = await request(server).post('/api/login').send({
            email: 'test@example.com',
            password: 'password123'
        });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Authentication successful');
    });

    it('should return 401 for incorrect credentials', async () => {
        const response = await request(server).post('/api/login').send({
            email: 'test@example.com',
            password: 'wrongpassword'
        });
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Unauthorized');
    });

    it('should return 400 if email or password is missing during login', async () => {
        const response = await request(server).post('/api/login').send({});
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'Email and password are required');
    });
});
