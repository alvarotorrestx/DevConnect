require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');

const app = express();
const port = process.env.PORT || 3000;

connectDB();

// Cross Origin Resource Sharing
app.use(cors(corsOptions))

// Socket.io
const http = require('http');
const server = http.createServer(app);
const socket = require('./socket');
socket.init(server);

// Routes
const systemRoutes = require('./routes/systemRoutes')
const userRoutes = require('./routes/userRoutes');
const registerRoutes = require('./routes/registerRoutes');
const authRoutes = require('./routes/authRoutes');
const refreshRoutes = require('./routes/refreshRoutes');
const logoutRoutes = require('./routes/logoutRoutes');
const profileRoutes = require('./routes/profileRoutes');
const postsRoutes = require('./routes/postsRoutes');

// Middleware
app.use(express.json());
app.use(cookieParser());
const { verifyJWT } = require('./middleware/verifyJWT');

// Main DB Routes
app.use('/register', registerRoutes);
app.use('/logout', logoutRoutes);
app.use('/auth', authRoutes);
app.get('/auth/verify', verifyJWT, (req, res) => {
    res.json({ message: `Hello ${req.user.firstName}, you have successfully logged on.` });
})
app.use('/auth/refresh', refreshRoutes);

// System Routes
app.use('/system', systemRoutes);

// User Routes
app.use('/api/users', userRoutes);

// Profile Routes
app.use('/profile', profileRoutes);

// Post Routes
app.use('/api/posts', postsRoutes)

server.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});