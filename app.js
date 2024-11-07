var express = require('express');
var sphp = require('sphp');

var app = express();
var server = app.listen(8080);

app.use(sphp.express('public/'));
app.use(express.static('public/'));

// app.js
const { connectToMongoDB } = require('./db');

// Connect to MongoDB on app start
connectToMongoDB();

// Additional app code here