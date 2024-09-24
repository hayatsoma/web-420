const express = require('express');
const books = require('../database/books'); // Import the books collection

const app = express();

// GET route to return an array of books
app.get('/api/books', async (req, res) => {
  try {
    const allBooks = await books.find(); // Retrieve all books using async/await
    res.status(200).json(allBooks);   // Send as JSON response
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET route to return a single book by ID
app.get('/api/books/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ message: 'ID must be a number' });
  }

  try {
    const book = await books.findOne({ id }); // Retrieve the book by ID using async/await
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book); // Send the found book as JSON response
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = app;


