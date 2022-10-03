const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const { createNewNote, deleteNote } = require('../lib/notes');
const { notes } = require('../db/db.json');
const { uuid } = require('uuidv4');

router.get('/notes', (req, res) => {
    const result = notes;
    if (result) {
        res.json(result);
    } else {
        res.sendStatus(404);
    }
});

router.post('/notes', (req, res) => {
    req.body.id = uuid().toString();

    if (!validateNote(req.body)) {
        res.status(400).send('The note you entered is not formatted properly.');
    } else {
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});

router.delete('/notes/:id', (req, res) => {
    let jsonFilePath = path.join(__dirname, '/db/db.json');
    for (let i = 0; i < notes.length; i++) {
        if (notes[i].id == req.params.id) {
            notes.splice(i, 1);
            break;
        }
    }
    fs.writeFileSync(jsonFilePath, JSON.stringify(notes), function (err) {
        if (err) {
            return console.log(err);
        } else {
            console.log("Note deleted!");
        }
    });
    res.json(notes);
});

module.exports = router;