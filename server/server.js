require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.get('/', (req, res) => {
    res.send('Welcome to DevConnect');
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});