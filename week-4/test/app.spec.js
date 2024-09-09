const request = require('supertest');
const app = require('../src/app'); // Adjust path if necessary

describe('Chapter [Number]: API Tests', () => {

  it('Should return an array of books', async () => {
    const response = await request(app).get('/api/books');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('Should return a single book', async () => {
    const response = await request(app).get('/api/books/1'); // Adjust ID as needed
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toBe(1); // Adjust as needed
  });

  it('Should return a 400 error if the id is not a number', async () => {
    const response = await request(app).get('/api/books/notanumber');
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('ID must be a number');
  });
});

