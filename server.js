// Import required libs and routes
const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// Set default ports for use
const PORT = process.env.PORT || 3001;

// Call app to initialize
const app = express();

// Creates routes that will serve front-end assets
app.use(express.static('public'));

// Parse incoming data
app.use(express.urlencoded({ extended: true }));

// Parse JSON data received
app.use(express.json());

// Routes app to modularized routes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// Designates PORT where the server will be listening
app.listen(PORT, () => {
    console.log(`API server listening to PORT ${PORT}!`);
});