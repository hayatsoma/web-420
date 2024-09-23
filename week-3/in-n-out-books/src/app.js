// Name: Hayat Soma
// Date: [Insert Date]
// File: app.js
// Description: In-N-Out-Books server setup with Express
const express = require('express');
const app = express();
// GET route for the root URL
app.get('/', (req, res) => {
  res.send(`
    <html>
    <head>
      <title>In-N-Out-Books</title>
    </head>
    <body>
      <h1>Welcome to In-N-Out-Books</h1>
      <p>Your personal book management system!</p>
    </body>
    </html>
  `);
});

// Simulate a route that triggers a 500 error for testing
app.get('/error', (req, res, next) => {
  next(new Error('Test Error')); // Pass the error to the error-handling middleware
});

// Middleware for handling 404 errors
app.use((req, res, next) => {
  res.status(404).send('404 - Not Found');
});

// Middleware for handling 500 errors
app.use((err, req, res, next) => {
  res.status(500).json({
    error: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : '🥞'
  });
});

// Export the app for testing
module.exports = app;




