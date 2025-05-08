const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); // Import the CORS package
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors()); // This will allow cross-origin requests from any domain

// Middleware
app.use(express.json()); // To parse JSON requests
app.use('/uploads', express.static('uploads'));

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = 'uploads';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('Only image files are allowed!'));
        }
        cb(null, true);
    }
});

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'WJ28@krhps',
    database: 'eticketingcinema'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Routes
app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

// Get all movies
app.get('/movies', (req, res) => {
    const query = 'SELECT * FROM movies ORDER BY created_at DESC';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching movies:', err);
            return res.status(500).json({ error: 'Error fetching movies' });
        }
        res.json(results);
    });
});

// Add new movie
app.post('/movies', upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image file uploaded' });
        }

        const { title, description, release_date } = req.body;
        
        if (!title || !description || !release_date) {
            // Delete the uploaded file if validation fails
            fs.unlinkSync(req.file.path);
            return res.status(400).json({ error: 'All fields are required' });
        }

        const image_url = `/uploads/${req.file.filename}`;
        
        const query = 'INSERT INTO movies (title, description, release_date, image_url) VALUES (?, ?, ?, ?)';
        db.query(query, [title, description, release_date, image_url], (err, result) => {
            if (err) {
                console.error('Error adding movie:', err);
                // Delete the uploaded file if database insertion fails
                fs.unlinkSync(req.file.path);
                return res.status(500).json({ error: 'Error adding movie' });
            }
            
            res.json({
                message: 'Movie added successfully',
                movie_id: result.insertId
            });
        });
    } catch (error) {
        console.error('Error processing movie upload:', error);
        res.status(500).json({ error: 'Error processing movie upload' });
    }
});

// Delete movie
app.delete('/movies/:id', (req, res) => {
    const movieId = req.params.id;
    
    // First get the movie to get its image path
    const getQuery = 'SELECT image_url FROM movies WHERE id = ?';
    db.query(getQuery, [movieId], (err, results) => {
        if (err) {
            console.error('Error fetching movie:', err);
            return res.status(500).json({ error: 'Error fetching movie' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        const imagePath = results[0].image_url;
        const fullImagePath = path.join(__dirname, imagePath);

        // Delete the movie from database
        const deleteQuery = 'DELETE FROM movies WHERE id = ?';
        db.query(deleteQuery, [movieId], (err, result) => {
            if (err) {
                console.error('Error deleting movie:', err);
                return res.status(500).json({ error: 'Error deleting movie' });
            }

            // Delete the image file
            if (fs.existsSync(fullImagePath)) {
                fs.unlinkSync(fullImagePath);
            }

            res.json({ message: 'Movie deleted successfully' });
        });
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: err.message });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
