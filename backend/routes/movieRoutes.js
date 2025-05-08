// movieRoutes.js

const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

// Get all movies
router.get('/', movieController.getAllMovies);

// Get movie by ID
router.get('/:id', movieController.getMovieById);

// Add new movie
router.post('/', movieController.addMovie);

// Update movie
router.put('/:id', movieController.updateMovie);

module.exports = router;
