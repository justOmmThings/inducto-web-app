const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL;

// Connect to MongoDB
mongoose.connect(DB_URL)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Define routes
app.use('/api/interviews', require('./routes/interviews'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
