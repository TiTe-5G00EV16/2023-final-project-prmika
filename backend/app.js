const express = require('express');
const cors = require('cors');

const cities = require('./routes/cities');
const users = require('./routes/users');

const app = express();
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://frontend-9s73.onrender.com'
  ]
}));
app.use(express.json());

app.use('/api/cities', cities);
app.use('/api/users', users);
app.get('/health', (req, res) => {
  res.send('OK');
});

module.exports = app;