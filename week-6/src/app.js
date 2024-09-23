const express = require('express');
const app = express();
const books = require('../database/book'); // Correct path to books
app.use(express.json());

app.put('/api/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title } = req.body;

    // Check if id is a number
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Input must be a number' });
    }

    // Check for missing title
    if (!title) {
        return res.status(400).json({ error: 'Bad Request' });
    }

    // Find and update the book (this is just a mock implementation)
    const bookIndex = books.findIndex(book => book.id === id);
    if (bookIndex !== -1) {
        books[bookIndex].title = title; // Update book title
        return res.status(204).send(); // No content
    }

    res.status(404).json({ error: 'Book not found' });
});

module.exports = app;

