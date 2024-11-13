// check_password.js
const { client } = require('../../db');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { username, password } = req.body;

    try {
        const collection = client.db('roomify_db').collection('users');
        const user = await collection.findOne({ username });

        if (user && await bcrypt.compare(password, user.password)) {
            req.session.username = user.username;
            res.redirect('/Root/html-pages/login_success.html?username=' + encodeURIComponent(username));
        } else {
            res.redirect('/Root/html-pages/login-page.html?error=1');
        }
    } catch (error) {
        console.error('Database Error:', error);
        res.status(500).send('A database error occurred. Please try again later.');
    }
};