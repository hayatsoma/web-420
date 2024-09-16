const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { addBook, deleteBook } = require('../database/books'); // Updated path

app.use(bodyParser.json());

// POST route to add a new book
app.post('/api/books', async (req, res) => {
    try {
        const { title, author } = req.body;

        if (!title) {
            return res.status(400).json({ message: 'Book title is required.' });
        }

        await addBook({ title, author });
        res.status(201).json({ message: 'Book added successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// DELETE route to delete a book by ID
app.delete('/api/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await deleteBook(id);

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Book not found.' });
        }

        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = app;

