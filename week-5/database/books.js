// database/books.js
let books = []; // Mock database

async function addBook(book) {
    books.push(book);
    return Promise.resolve();
}

async function deleteBook(id) {
    const index = books.findIndex(book => book.id === id);
    if (index !== -1) {
        books.splice(index, 1);
    }
    return Promise.resolve({ deletedCount: index !== -1 ? 1 : 0 });
}

module.exports = { addBook, deleteBook };

