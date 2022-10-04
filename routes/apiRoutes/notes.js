const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const { uuid } = require('uuidv4');
const { createNote, checkNote } = require('../../lib/notes');
const { notes } = require('../../db/notes');

router.get('/notes', (req, res) => {
    const retrieve = notes;
    if (retrieve) {
        res.json(retrieve);
    } else {
        res.sendStatus(404);
    }
});

router.post('/notes', (req, res) => {
    req.body.id = uuid().toString();
    if (!checkNote(req.body)) {
        res.status(400).send('Note not in a valid format. Please try again!');
    } else {
        const newNote = createNote(req.body, notes);
        res.json(newNote);
    }
});

router.delete('/notes/:id', (req, res) => {
    let jsonFilePath = path.join(__dirname, "../../db/notes.json");
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