// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const app = express();
const cors = require ('cors');

app.use(
    cors({
        origin: '*' , credentials: true
    })
)

// Middleware
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Routes
app.use('/api', userRoutes); // Use the user routes

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/gov-streamliner', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(5000, () => {
      console.log('Server running on port 5000');
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });