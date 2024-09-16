const request = require('supertest');
const app = require('../src/app');
const { addBook, deleteBook } = require('../database/books');

// Mock the database methods
jest.mock('../database/books');

describe('Chapter [Number]: API Tests', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('POST /api/books', () => {
        it('should return a 201-status code when adding a new book', async () => {
            addBook.mockResolvedValue({});

            const response = await request(app)
                .post('/api/books')
                .send({ title: 'New Book', author: 'Author' });

            expect(response.status).toBe(201);
            expect(response.body.message).toBe('Book added successfully.');
        });

        it('should return a 400-status code when adding a new book with missing title', async () => {
            const response = await request(app)
                .post('/api/books')
                .send({ author: 'Author' });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Book title is required.');
        });
    });

    describe('DELETE /api/books/:id', () => {
        it('should return a 204-status code when deleting a book', async () => {
            deleteBook.mockResolvedValue({ deletedCount: 1 });

            const response = await request(app)
                .delete('/api/books/1');

            expect(response.status).toBe(204);
        });

        it('should return a 404-status code when deleting a book that does not exist', async () => {
            deleteBook.mockResolvedValue({ deletedCount: 0 });

            const response = await request(app)
                .delete('/api/books/999');

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Book not found.');
        });
    });
});



