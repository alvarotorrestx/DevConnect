require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 3000;

connectDB();

// Routes
const registerRoutes = require('./routes/registerRoutes');
const authRoutes = require('./routes/authRoutes');
const refreshRoutes = require('./routes/refreshRoutes');

// Middleware
app.use(express.json());
app.use(cookieParser());
const { verifyJWT } = require('./middleware/verifyJWT');

app.use('/register', registerRoutes);
app.use('/auth', authRoutes);
app.get('/auth/verify', verifyJWT, (req, res) => {
    res.json({ message: `Hello ${req.user.firstName}, you have successfully logged on.` });
})
app.use('/auth/refresh', refreshRoutes);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});