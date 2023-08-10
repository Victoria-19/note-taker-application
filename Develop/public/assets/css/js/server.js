const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//load existing notes from JSON file
let allNotes = require('./db/db.json');

// route to get all notes 

app.get('/api/notes', (req, res) => {
    res.json(allNotes.slice(1));
});

// serve the home page 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

