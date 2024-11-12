const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const { connectToMongoDB } = require('./db');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: true }));

// Static files
app.use(express.static(path.join(__dirname, 'Root/assets')));
app.use(express.static(path.join(__dirname, 'Root/html-pages')));

// Connect to MongoDB on app start
connectToMongoDB().catch(console.error);

// Route requests to the appropriate API files
app.use('/api/check_password', require('./Root/api/check_password'));
app.use('/api/login_process', require('./Root/api/login_process'));
app.use('/api/password_hash', require('./Root/api/password_hash'));
app.use('/api/password_verify', require('./Root/api/password_verify'));
app.use('/api/signup_process', require('./Root/api/signup_process'));
app.use('/api/create', require('./Root/api/create'));
app.use('/api/read', require('./Root/api/read'));
app.use('/api/update', require('./Root/api/update'));
app.use('/api/delete', require('./Root/api/delete'));

// Serve the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Root/home-page.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;