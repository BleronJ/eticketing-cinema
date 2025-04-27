// movieRoutes.js

const express = require('express');
const router = express.Router();
const db = require('./db');  // Assuming your db connection is in a separate file called db.js

// Route to get all movies
router.get('/movies', (req, res) => {
  db.query('SELECT * FROM movies', (err, results) => {
    if (err) {
      return res.status(500).send('Error fetching movies');
    }
    res.json(results);  // Send movies as a response in JSON format
  });
});

module.exports = router;
