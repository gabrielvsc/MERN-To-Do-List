require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connection = require("./db")

// database connection
connection();

// middlewares
app.use(express.json())
app.use(cors());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server connected on port ${PORT}`));

