const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Per gestire i file media

// Rotte
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// Connessione a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => app.listen(5000, () => console.log('Server running on port 5000')))
  .catch(err => console.log(err));


app.use(cors());
