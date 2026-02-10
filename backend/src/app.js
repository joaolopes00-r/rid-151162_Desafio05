const express = require('express');
const cors = require('cors');
const livrosRoutes = require('./routes/livrosRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(livrosRoutes);

module.exports = app;
