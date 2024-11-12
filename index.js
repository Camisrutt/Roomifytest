const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const { connectToMongoDB } = require('./db');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: true }));

// Static files
app.use(express.static('public'));

// Connect to MongoDB on app start
connectToMongoDB().catch(console.error);

// Route requests to the appropriate API files
app.use('/api/check_password', require('./Root/api/check_password'));
app.use('/api/login_process', require('./Root/api/login_process'));
app.use('/api/password_hash', require('./Root/api/password_hash'));
app.use('/api/password_verify', require('./Root/api/password_verify'));
app.use('/api/signup_process', require('./Root/api/signup_process'));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});