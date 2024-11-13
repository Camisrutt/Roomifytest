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
app.use('/assets', express.static(path.join(__dirname, 'Root/assets')));
app.use('/css', express.static(path.join(__dirname, 'Root/assets/css')));
app.use('/html-pages', express.static(path.join(__dirname, 'Root/html-pages')));
app.use('/root', express.static(path.join(__dirname, 'Root/')));

// Connect to MongoDB on app start
connectToMongoDB().catch(console.error);

// Route requests to the appropriate API files
app.use('/api/check_password', require('./api/check_password'));
app.use('/api/login_process', require('./api/login_process'));
app.use('/api/password_hash', require('./api/password_hash'));
app.use('/api/password_verify', require('./api/password_verify'));
app.use('/api/signup_process', require('./api/signup_process'));
app.use('/api/create', require('./api/create'));
app.use('/api/read', require('./api/read'));
app.use('/api/update', require('./api/update'));
app.use('/api/delete', require('./api/delete'));

// Serve the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Root/home-page.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;