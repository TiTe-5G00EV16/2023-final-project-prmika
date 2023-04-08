const express = require('express');
const cors = require('cors');

const cities = require('./routes/cities');
const users = require('./routes/users');
const stores = require('./routes/stores');
const chains = require('./routes/chains');

const app = express();
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://frontend-9s73.onrender.com'
  ]
}));
app.use(express.json());

app.use('/api/cities', cities);
app.use('/api/stores', stores);
app.use('/api/chains', chains);
app.use('/api/users', users);
app.get('/health', (req, res) => {
  res.send('OK');
});

module.exports = app;