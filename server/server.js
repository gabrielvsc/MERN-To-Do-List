require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connection = require("./db")
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');

// database connection
connection();

// middlewares
app.use(express.json())
app.use(cors());

//routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/task', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server connected on port ${PORT}`));

