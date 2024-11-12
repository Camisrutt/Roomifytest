// api_helper.js
const fetch = require('node-fetch');

async function callNodeAPI(endpoint, method = 'GET', data = null) {
    const url = `https://roomifytest.vercel.app/api/${endpoint}`;
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: data ? JSON.stringify(data) : null
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error calling Node API:', error);
        throw error;
    }
}

module.exports = { callNodeAPI };