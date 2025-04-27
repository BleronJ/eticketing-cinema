console.log("It is showing the movies");

$(document).ready(function () {
    const movies = [];

    // Fetch movie data from the backend
    fetch('http://localhost:5000/api/movies')
        .then(response => response.json())
        .then(data => {
            // Populate the 'movies' array with movie data from the backend
            data.forEach(movie => {
                movies.push({ title: movie.title, imgSrc: movie.imgSrc });  // Assuming 'title' and 'imgSrc' are column names in your DB
                // Optionally, render the movie cards dynamically on the page
                $(".movie-list").append(`
                    <div class="movie-card">
                        <img src="${movie.imgSrc}" alt="${movie.title}" class="movie-image">
                        <h2 class="movie-title">${movie.title}</h2>
                    </div>
                `);
            });
        })
        .catch(error => console.error('Error fetching movies:', error));

    // Filtering logic
    function filterMovies(query) {
        return movies.filter((movie) =>
            movie.title.toLowerCase().includes(query.toLowerCase())
        );
    }

    // Search input handling
    $("#movieSearch").on("input", function () {
        const query = $(this).val().trim();
        const results = filterMovies(query);

        $("#searchResults").empty();  // Clear previous results

        if (query && results.length > 0) {
            results.forEach((movie) => {
                $("#searchResults").append(`
                    <li>
                        <img src="${movie.imgSrc}" alt="${movie.title}" class="result-thumbnail">
                        <span>${movie.title}</span>
                    </li>
                `);
            });
        } else if (query) {
            $("#searchResults").append("<li>No results found</li>");
        }
    });

    // Search result click handling
    $("#searchResults").on("click", "li", function () {
        const selectedMovie = $(this).find("span").text().trim();
        alert(`You selected: ${selectedMovie}`);
        $("#movieSearch").val(selectedMovie);
        $("#searchResults").empty();  // Clear search results
    });

    // FAQ item toggle functionality
    document.querySelectorAll('.faq-item h3').forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            item.classList.toggle('active');
        });
    });
});
