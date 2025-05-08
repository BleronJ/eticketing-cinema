-- Procedure to add a new movie
DELIMITER //

CREATE PROCEDURE AddMovie(
    IN p_title VARCHAR(255),
    IN p_description TEXT,
    IN p_duration INT,
    IN p_genre VARCHAR(100),
    IN p_release_date DATE,
    IN p_rating DECIMAL(3,1),
    IN p_image_url VARCHAR(255),
    OUT p_movie_id INT
)
BEGIN
    INSERT INTO movies (
        title,
        description,
        duration,
        genre,
        release_date,
        rating,
        image_url
    ) VALUES (
        p_title,
        p_description,
        p_duration,
        p_genre,
        p_release_date,
        p_rating,
        p_image_url
    );
    
    SET p_movie_id = LAST_INSERT_ID();
END //

-- Procedure to update a movie
CREATE PROCEDURE UpdateMovie(
    IN p_movie_id INT,
    IN p_title VARCHAR(255),
    IN p_description TEXT,
    IN p_duration INT,
    IN p_genre VARCHAR(100),
    IN p_release_date DATE,
    IN p_rating DECIMAL(3,1),
    IN p_image_url VARCHAR(255)
)
BEGIN
    UPDATE movies
    SET 
        title = p_title,
        description = p_description,
        duration = p_duration,
        genre = p_genre,
        release_date = p_release_date,
        rating = p_rating,
        image_url = p_image_url
    WHERE id = p_movie_id;
END //

-- Procedure to get all movies
CREATE PROCEDURE GetAllMovies()
BEGIN
    SELECT * FROM movies ORDER BY release_date DESC;
END //

-- Procedure to get movie by ID
CREATE PROCEDURE GetMovieById(IN p_movie_id INT)
BEGIN
    SELECT * FROM movies WHERE id = p_movie_id;
END //

DELIMITER ; 