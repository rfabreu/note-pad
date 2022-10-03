const router = require('express').Router();

const { createNewNote, deleteNote } = require('../../lib/notes');

const { notes } = require('../../db/db.json');

router.get('/notes', (req, res) => {
    res.json(notes);
});

router.post('/notes', (req, res) => {
    req.body.id = notes.length.toString();
    const note = createNewNote(req.body, notes);
    res.json(note);
});

router.delete('/notes/:id', function (req, res) {
    const { id } = req.params;
    const projectIndex = notes.findIndex(notes => notes.id == id);
    notes.splice(projectIndex, 1);

    deleteNote(notes);

    return res.send("Note deleted!");
});

module.exports = router;