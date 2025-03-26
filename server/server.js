require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const app = express();
const port = process.env.PORT || 3000;

connectDB();

// Routes
const userRoutes = require('./routes/userRoutes');

// Middleware
app.use(express.json());

app.use('/api/users', userRoutes);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});