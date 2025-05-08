const pool = require('../config/db');

// Get all movies
const getAllMovies = async (req, res) => {
    try {
        const [rows] = await pool.query('CALL GetAllMovies()');
        res.json(rows[0]);
    } catch (error) {
        console.error('Error getting movies:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get movie by ID
const getMovieById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query('CALL GetMovieById(?)', [id]);
        
        if (rows[0].length === 0) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        
        res.json(rows[0][0]);
    } catch (error) {
        console.error('Error getting movie:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Add new movie
const addMovie = async (req, res) => {
    try {
        const { title, description, duration, genre, release_date, rating, image_url } = req.body;
        
        const [result] = await pool.query(
            'CALL AddMovie(?, ?, ?, ?, ?, ?, ?, @movie_id)',
            [title, description, duration, genre, release_date, rating, image_url]
        );
        
        const [rows] = await pool.query('SELECT @movie_id as movie_id');
        const movieId = rows[0].movie_id;
        
        res.status(201).json({
            message: 'Movie added successfully',
            movie_id: movieId
        });
    } catch (error) {
        console.error('Error adding movie:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update movie
const updateMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, duration, genre, release_date, rating, image_url } = req.body;
        
        await pool.query(
            'CALL UpdateMovie(?, ?, ?, ?, ?, ?, ?, ?)',
            [id, title, description, duration, genre, release_date, rating, image_url]
        );
        
        res.json({ message: 'Movie updated successfully' });
    } catch (error) {
        console.error('Error updating movie:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllMovies,
    getMovieById,
    addMovie,
    updateMovie
}; 