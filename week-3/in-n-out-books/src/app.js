/**
 * Author: Hayat Soma
 * Date: 9/01/2024
 * File Name: app.js
 * Description: Sets up the Express application for the "In-N-Out-Books" project.
 */

// Step 1: Set up the Express application
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Step 2: Add a GET route for the root URL ('/')
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>In-N-Out Books</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
        header { background-color: #333; color: #fff; text-align: center; padding: 1em 0; }
        main { padding: 2em; text-align: center; }
      </style>
    </head>
    <body>
      <header>
        <h1>Welcome to In-N-Out Books</h1>
      </header>
      <main>
        <p>Manage your book collection with ease!</p>
      </main>
    </body>
    </html>
  `);
});

// Step 3: Add middleware to handle 404 errors
app.use((req, res, next) => {
  res.status(404).send('404: Page Not Found');
});

// Step 4: Add middleware to handle 500 errors
app.use((err, req, res, next) => {
  const isDevelopment = app.get('env') === 'development';
  res.status(500).json({
    message: 'Internal Server Error',
    ...(isDevelopment && { stack: err.stack })
  });
});

// Step 5: Export the Express application
module.exports = app;

// Optional: Start the server if this file is run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}


