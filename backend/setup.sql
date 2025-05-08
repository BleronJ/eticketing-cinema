-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS eticketingcinema;
USE eticketingcinema;

-- Drop the table if it exists to ensure clean setup
DROP TABLE IF EXISTS movies;

-- Create the movies table with the correct structure
CREATE TABLE movies (
    movie_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    release_date DATE,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert some sample movies if the table is empty
INSERT INTO movies (title, description, release_date, image_url)
SELECT 'The Matrix', 'A computer hacker learns about the true nature of reality', '1999-03-31', 'https://example.com/matrix.jpg'
WHERE NOT EXISTS (SELECT 1 FROM movies);

INSERT INTO movies (title, description, release_date, image_url)
SELECT 'Inception', 'A thief who steals corporate secrets through dream-sharing technology', '2010-07-16', 'https://example.com/inception.jpg'
WHERE NOT EXISTS (SELECT 1 FROM movies); 