const fs = require("fs");
const path = require("path");

function createNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/notes.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;
}

function checkNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
}

module.exports = { createNote, checkNote };