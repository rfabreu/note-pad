const fs = require('fs');
const path = require('path');

// Import UID-GENERATOR lib to create unique keys
const KeyGenerator = require('uid-generator');

function createNewNote(body, notesArray) {
    const note = body;

    const keygen = new KeyGenerator();

    body.id = keygen.generate();

    notesArray.push(note);

    fs.writeFileSync(
        path.join(__dirname, "../db/db.json"),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;
}

function deleteNote(notesArray) {
    fs.writeFileSync(
        path.join(__dirname, "../db/db.json"),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
}

module.exports = { deleteNote, createNewNote };