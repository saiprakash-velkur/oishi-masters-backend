const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const helmet = require('helmet');
const serverless = require('serverless-http');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(helmet()); // Adds security headers
app.use(cors()); // for dev

// app.use(cors({ origin: 'https://yourfrontend.com' })); // Replace with actual frontend domain


app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/chefs', require('./routes/chefRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/cuisines', require('./routes/cuisineRoutes'));

module.exports = app;
module.exports.handler = serverless(app);
