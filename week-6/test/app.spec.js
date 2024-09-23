/**
 * Title: app.spec.js
 * Author: Hayat Soma
 * Date: 9/22/2024
 * Description: Test suite for the in-n-out-books API using Jest and Supertest.
 */

const request = require('supertest');
const app = require('../src/app'); // Adjust path to your app.js

describe('Chapter [Number]: API Tests', () => {
    it('Should update a book and return a 204-status code', async () => {
        const response = await request(app)
            .put('/api/books/1') // Change to the correct ID
            .send({ title: 'Updated Book Title' });

        expect(response.status).toBe(204);
    });

    it('Should return a 400-status code when using a non-numeric id', async () => {
        const response = await request(app)
            .put('/api/books/foo')
            .send({ title: 'Updated Book Title' });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Input must be a number');
    });

    it('Should return a 400-status code when updating a book with a missing title', async () => {
        const response = await request(app)
            .put('/api/books/1') // Change to the correct ID
            .send({}); // Missing title

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Bad Request');
    });
});

