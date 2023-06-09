const express = require('express');
const cors = require('cors');

const users = require('./routes/users');
const products = require('./routes/products');

const app = express();
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'https://frontend-9s73.onrender.com'
  ]
}));
app.use(express.json());

app.use('/api/products', products);
app.use('/api/users', users);
app.get('/health', (req, res) => {
  res.send('OK');
});

module.exports = app;