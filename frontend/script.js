$(document).ready(function () {
    const movies = [];

   
    $(".movie-card").each(function () {
        const title = $(this).find(".movie-title").text().trim();
        const imgSrc = $(this).find(".movie-image").attr("src");

        if (title && imgSrc) {
            movies.push({ title, imgSrc });
        }
    });

    
    function filterMovies(query) {
        return movies.filter((movie) =>
            movie.title.toLowerCase().includes(query.toLowerCase())
        );
    }

   
    $("#movieSearch").on("input", function () {
        const query = $(this).val().trim();
        const results = filterMovies(query);

        $("#searchResults").empty();  
        
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

    
    $("#searchResults").on("click", "li", function () {
        const selectedMovie = $(this).find("span").text().trim();
        alert(`You selected: ${selectedMovie}`);
        $("#movieSearch").val(selectedMovie);
        $("#searchResults").empty();  
    });

    
    document.querySelectorAll('.faq-item h3').forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            item.classList.toggle('active');
        });
    });
});
