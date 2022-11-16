require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connection = require("./db")
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');

const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger_output.json');

app.use(cors());

// database connection
connection();

// middlewares
app.use(express.json())
app.use(cors());
app.use('/document', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.urlencoded({ extended: false }));

//routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/task', taskRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server connected on port ${PORT}`));

