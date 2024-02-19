// app.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/booklistdb', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Book Schema
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    genre: String,
    year: Number
});

const Book = mongoose.model('Book', bookSchema);

// Routes
app.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/books', async (req, res) => {
    const { title, author, genre, year } = req.body;
    try {
        const newBook = new Book({ title, author, genre, year });
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        console.error('Error adding book:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Add other CRUD routes (PUT, DELETE) as needed

// Start server
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
