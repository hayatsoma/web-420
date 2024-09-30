// Name: Hayat Soma
// Date: [Insert Date]
// File: app.js
// Description: In-N-Out-Books server setup with Express

const express = require('express');
const app = express();
app.use(express.json());

// Sample data for books and users
let books = [
    { id: 1, title: 'Book One' },
    { id: 2, title: 'Book Two' }
];

let users = [
    { email: 'test@example.com', password: 'password123' }
];

// GET all books
app.get('/api/books', (req, res) => {
    return res.status(200).json(books);
});

// GET a single book by ID
app.get('/api/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(400).json({ message: 'Invalid book ID' });
    return res.status(200).json(book);
});

// POST create a new book
app.post('/api/books', (req, res) => {
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });

    const newBook = { id: books.length + 1, title };
    books.push(newBook);
    return res.status(201).json(newBook);
});

// PUT update a book by ID
app.put('/api/books/:id', (req, res) => {
    const { title } = req.body;
    const book = books.find(b => b.id === parseInt(req.params.id));

    if (!book) return res.status(400).json({ message: 'Invalid book ID' });
    if (!title) return res.status(400).json({ message: 'Title is required for update' });

    book.title = title;
    return res.status(204).send();
});

// DELETE a book by ID
app.delete('/api/books/:id', (req, res) => {
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
    if (bookIndex === -1) return res.status(400).json({ message: 'Invalid book ID' });

    books.splice(bookIndex, 1);
    return res.status(204).send();
});

// POST login a user
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    return res.status(200).json({ message: 'Authentication successful' });
});

module.exports = app;


