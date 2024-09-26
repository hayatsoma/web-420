const request = require('supertest');
const app = require('../src/app');

describe('In-N-Out-Books API', () => {
    // Test GET /api/books
    it('should return an array of books', async () => {
        const response = await request(app).get('/api/books');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    // Test GET /api/books/:id
    it('should return a single book by ID', async () => {
        const response = await request(app).get('/api/books/1');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('title');
    });

    it('should return 400 for invalid book ID', async () => {
        const response = await request(app).get('/api/books/abc');
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Invalid book ID');
    });

    // Test POST /api/books
    it('should create a new book', async () => {
        const response = await request(app).post('/api/books').send({ title: 'New Book' });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('title', 'New Book');
    });

    it('should return 400 if title is missing', async () => {
        const response = await request(app).post('/api/books').send({});
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Book title is required');
    });

    // Test PUT /api/books/:id
    it('should update a book', async () => {
        const response = await request(app).put('/api/books/1').send({ title: 'Updated Book' });
        expect(response.status).toBe(204);
    });

    it('should return 400 if title is missing in update', async () => {
        const response = await request(app).put('/api/books/1').send({});
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Book title is required');
    });

    // Test DELETE /api/books/:id
    it('should delete a book', async () => {
        const response = await request(app).delete('/api/books/1');
        expect(response.status).toBe(204);
    });

    // Test POST /api/login
    it('should log in a user with correct credentials', async () => {
        const response = await request(app).post('/api/login').send({
            email: 'test@example.com',
            password: 'password123'
        });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Authentication successful');
    });

    it('should return 401 for incorrect credentials', async () => {
        const response = await request(app).post('/api/login').send({
            email: 'test@example.com',
            password: 'wrongpassword'
        });
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Unauthorized');
    });

    it('should return 400 if email or password is missing', async () => {
        const response = await request(app).post('/api/login').send({});
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Email and password are required');
    });
});


