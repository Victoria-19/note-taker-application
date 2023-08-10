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

// serve note page 

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// catch all route to handle unknown paths 

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// Function to create a new note 

function createNewNote(body, notesArray) {
    const newNote = body;
    if (!Array.isArray(notesArray)) {
        notesArray = [];
    }
    
    if (notesArray.length === 0) {
        notesArray.push(0);
    }

    body.id = notesArray[0];
    notesArray[0]++;

    notesArray.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );
    return newNote;
}

//route to create new note 

