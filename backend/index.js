const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); // Import the CORS package
const app = express();
const port = 8080;

// Enable CORS for all routes
app.use(cors()); // This will allow cross-origin requests from any domain

// Middleware
app.use(express.json()); // To parse JSON requests

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Make sure this is correct for your setup
  password: 'WJ28@krhps', // Your MySQL password
  database: 'eticketingcinema',
});

db.connect((err) => {
  if (err) {
    console.log('Error connecting to the database');
    return;
  }
  console.log('Connected to the database');
});

// Routes
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.get('/api/movies', (req, res) => {
  db.query('SELECT * FROM movies', (err, result) => {
    if (err) {
      res.status(500).send('Error retrieving movies');
      return;
    }
    res.json(result);
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get('/api/movies', async (req, res) => {
    try {
        const movies = await getMoviesFromDatabase(); // This fetches from your database
        res.json(movies);
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
