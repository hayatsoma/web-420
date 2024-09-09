const express = require('express');
const app = express();
const { getAllBooks } = require('./database/books'); // Adjust import based on actual file structure

app.get('/api/books', async (req, res) => {
  try {
    const books = await getAllBooks();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
