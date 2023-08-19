const express = require('express');
const fs = require('fs');
const path = require('path');
var uniqid = require('uniqid');
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
    console.log(allNotes)
    console.log(allNotes.slice(1))
    res.json(allNotes);
});

// serve the home page 

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '/public/notes.html'));
// });

// serve note page 

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// catch all route to handle unknown paths 


// Function to create a new note 

function createNewNote(body, notesArray) {
    const newNote = body;
    if (!Array.isArray(notesArray)) {
        notesArray = [];
    }
    console.log(newNote)
    // if (notesArray.length === 0) {
    //     notesArray.push(0);
    // }
newNote.id=uniqid()
console.log(newNote)
    // body.id = notesArray[0];
    // notesArray[0]++;

    notesArray.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesArray)
    );
    return newNote;
}

//route to create new note 

app.post('/api/notes', (req, res) => {
    const newNote = createNewNote(req.body, allNotes);
    res.json(newNote);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
    });

// start server

app.listen(PORT, () => {
    console.log(`API server now on port http://localhost:${PORT}`);
});