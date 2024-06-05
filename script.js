        const apiKey = '7526d20a12dec34d246a3369de64b518';
        const apiUrl = 'https://api.themoviedb.org/3/discover/movie';
        const genreUrl = 'https://api.themoviedb.org/3/genre/movie/list';

        const moviesContainer = document.getElementById("movies");
        const genreDropdown = document.getElementById("genre");
        const sortDropdown = document.getElementById("sort");
        const yearDropdown = document.getElementById("year");

        // Fetch genres and populate dropdown
        async function fetchGenres() 
        {
            try {
                const response = await fetch(`${genreUrl}?api_key=${apiKey}`);
                const data = await response.json();
                data.genres.forEach(genre => {
                    const option = document.createElement("option");
                    option.value = genre.id;
                    option.textContent = genre.name;
                    genreDropdown.appendChild(option);
                });
            } catch (error) {
                console.error("Error fetching genres:", error);
            }
        }

        // Fetch genres and populate years dropdown 
        function populateYearsDropdown() {
            const currentYear = new Date().getFullYear();
            for (let year = currentYear; year >= 1900; year--) {
                const option = document.createElement("option");
                option.value = year;
                option.textContent = year;
                yearDropdown.appendChild(option);
            }
        }

        // Fetch and display movies based on selected genre, year, and sorting option
        async function fetchMovies() {
            try {
                const genre = genreDropdown.value;
                const year = yearDropdown.value;
                const sort = sortDropdown.value;
                let url = `${apiUrl}?api_key=${apiKey}&sort_by=${sort}`;
                if (genre) {
                    url += `&with_genres=${genre}`;
                }
                if (year) {
                    url += `&primary_release_year=${year}`;
                }
                const response = await fetch(url);
                const data = await response.json();
                moviesContainer.innerHTML = ''; // Clear previous movies
                data.results.forEach(media => {
                    const movieCard = createMovieCard(media);
                    moviesContainer.appendChild(movieCard);
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        // Create movie card
        function createMovieCard(media) {
            const { title, name, backdrop_path, vote_average, release_date } = media;

            const movieCard = document.createElement("div");
            movieCard.classList.add("movie_item");

            const releaseYear = new Date(release_date).getFullYear();

            movieCard.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500/${backdrop_path}" class="movie_img_rounded">
                <div class="title">${title || name}</div>
                <div class="rating">Rating: ${vote_average}</div>
                <div class="release_year">Release Year: ${releaseYear}</div>
            `;
            return movieCard;
        }

        // Event listeners for dropdown changes
        genreDropdown.addEventListener("change", fetchMovies);
        sortDropdown.addEventListener("change", fetchMovies);
        yearDropdown.addEventListener("change", fetchMovies);

        // Initialize
        fetchGenres();
        populateYearsDropdown();
        fetchMovies();
    
