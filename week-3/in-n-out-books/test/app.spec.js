const request = require('supertest');
const app = require('../src/app'); // Adjust the path if necessary

describe('GET /', () => {
  it('should return the landing page', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('Welcome to In-N-Out-Books');
  });
});

describe('404 error handling', () => {
  it('should return a 404 error for an unknown route', async () => {
    const res = await request(app).get('/unknown-route');
    expect(res.statusCode).toEqual(404);
    expect(res.text).toEqual('404 - Not Found');
  });
});

describe('500 error handling', () => {
  it('should return a 500 error when triggered', async () => {
    // Simulate an error by creating a faulty route
    app.get('/error', (req, res) => {
      throw new Error('Test Error');
    });

    const res = await request(app).get('/error');
    expect(res.statusCode).toEqual(500);
    expect(res.body.error).toEqual('Test Error');
  });
});
