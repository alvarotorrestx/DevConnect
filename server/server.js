require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const app = express();
const port = process.env.PORT || 3000;

connectDB();

// Routes
const registerRoutes = require('./routes/registerRoutes');
const authRoutes = require('./routes/authRoutes');

// Middleware
app.use(express.json());

app.use('/register', registerRoutes);
app.use('/auth', authRoutes);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});