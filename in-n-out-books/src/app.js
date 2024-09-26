// Name: Hayat Soma
// Date: [Insert Date]
// File: app.js
// Description: In-N-Out-Books server setup with Express
const express = require('express');
const app = express();
const books = require('../database/books');
const users = require('../database/users');
const bcrypt = require('bcryptjs');

// Middleware
app.use(express.json());

// GET: Return all books
app.get('/api/books', (req, res) => {
    try {
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET: Return a single book by ID
app.get('/api/books/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) return res.status(400).json({ message: 'Invalid book ID' });

        const book = books.find(b => b.id === id);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        res.json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST: Add a new book
app.post('/api/books', (req, res) => {
    try {
        const { title } = req.body;
        if (!title) return res.status(400).json({ message: 'Book title is required' });

        const newBook = { id: books.length + 1, title };
        books.push(newBook);

        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT: Update a book
app.put('/api/books/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) return res.status(400).json({ message: 'Invalid book ID' });

        const { title } = req.body;
        if (!title) return res.status(400).json({ message: 'Book title is required' });

        const bookIndex = books.findIndex(b => b.id === id);
        if (bookIndex === -1) return res.status(404).json({ message: 'Book not found' });

        books[bookIndex].title = title;
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE: Remove a book
app.delete('/api/books/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) return res.status(400).json({ message: 'Invalid book ID' });

        const bookIndex = books.findIndex(b => b.id === id);
        if (bookIndex === -1) return res.status(404).json({ message: 'Book not found' });

        books.splice(bookIndex, 1);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST: User login
app.post('/api/login', (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

        const user = users.find(u => u.email === email);
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        res.status(200).json({ message: 'Authentication successful' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = app;
