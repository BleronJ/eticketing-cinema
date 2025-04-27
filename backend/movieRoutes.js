// movieRoutes.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // Use your MySQL username
  password: 'WJ28@krhps',  
  database: 'eticketingcinema'
});

// Route to get all movies
router.get('/movies', (req, res) => {
  db.query('SELECT * FROM movies', (err, results) => {
    if (err) {
      return res.status(500).send('Error fetching movies');
    }
    res.json(results);  // Send movies as a response in JSON format
  });
});

// Route to get a specific movie by ID
router.get('/movies/:id', (req, res) => {
  const movieId = req.params.id;
  db.query('SELECT * FROM movies WHERE id = ?', [movieId], (err, results) => {
    if (err) {
      return res.status(500).send('Error fetching movie');
    }
    if (results.length === 0) {
      return res.status(404).send('Movie not found');
    }
    res.json(results[0]);
  });
});

// Route to create a new movie
router.post('/movies', (req, res) => {
  const { title, director, release_year, genre } = req.body;
  const query = 'INSERT INTO movies (title, director, release_year, genre) VALUES (?, ?, ?, ?)';
  
  db.query(query, [title, director, release_year, genre], (err, result) => {
    if (err) {
      return res.status(500).send('Error creating movie');
    }
    res.status(201).send('Movie created successfully');
  });
});

// Route to update a movie
router.put('/movies/:id', (req, res) => {
  const movieId = req.params.id;
  const { title, director, release_year, genre } = req.body;

  const query = 'UPDATE movies SET title = ?, director = ?, release_year = ?, genre = ? WHERE id = ?';

  db.query(query, [title, director, release_year, genre, movieId], (err, result) => {
    if (err) {
      return res.status(500).send('Error updating movie');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Movie not found');
    }
    res.send('Movie updated successfully');
  });
});

// Route to delete a movie
router.delete('/movies/:id', (req, res) => {
  const movieId = req.params.id;

  const query = 'DELETE FROM movies WHERE id = ?';
  
  db.query(query, [movieId], (err, result) => {
    if (err) {
      return res.status(500).send('Error deleting movie');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Movie not found');
    }
    res.send('Movie deleted successfully');
  });
});

module.exports = router;
