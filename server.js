const express = require('express');
const router = require('express').Router();
const apiRoutes = require('./routes/apiRoutes/notes.js');
const htmlRoutes = require('./routes/htmlRoutes');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () => 
    console.log(`App running on port ${PORT}!`)
);

// Credits: Codebase may contain parts of Univesity of Toronto Bootcamp lesson project.