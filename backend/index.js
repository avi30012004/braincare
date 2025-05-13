const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection URL (replace with your connection string)
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/braincare';

let db;

// Connect to MongoDB
MongoClient.connect(mongoUri)
  .then(client => {
    console.log('Connected to MongoDB');
    db = client.db(); // Get the database instance and assign to the 'db' variable

    // Define your routes here after the database connection is established
    // For example:
    // const userRoutes = require('./routes/userRoutes')(db);
    // app.use('/api/user', userRoutes);

    // Basic Root Route
    app.get('/', (req, res) => {
      res.send('BrainCare Backend is running and connected to MongoDB!');
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1); // Exit the process if MongoDB connection fails
  });
