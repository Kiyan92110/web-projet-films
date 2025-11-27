const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MWQ0NGJiOGJhZTQxZDAwMmIyMjUwMjkxNzVlMDBiMSIsIm5iZiI6MTc2MjQ0NzE2OC41ODIsInN1YiI6IjY5MGNjZjQwNzU1ZjVlYzAwYzA3MTcxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QtgDg6G6UEBjP6MgAZxwECjW0n-HAo_NtRGeb5qdUg0';
const API_BASE_URL = 'https://api.themoviedb.org/3/trending/movie/week';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const filmsContainer = document.getElementById('films-container');

// Fallback data if API fails
const fallbackFilms = [
    {
        title: "The Shadow's Edge",
        poster_path: "/e0RU6KpdnrqFxDKlI3NOqN8nHL6.jpg",
        release_date: "2025-08-16",
        vote_average: 6.296,
        overview: "Macau Police brings the tracking expert police officer out of retirement to help catch a dangerous group of professional thieves."
    },
    {
        title: "Bureau 749",
        poster_path: "/flykCMw22y6yv8vKnBjmsW3pneo.jpg",
        release_date: "2024-10-01",
        vote_average: 5.5,
        overview: "A traumatized young man with physical abnormalities is forced to join a mysterious bureau to confront a disaster spreading across the earth."
    },
    {
        title: "The Family Plan 2",
        poster_path: "/semFxuYx6HcrkZzslgAkBqfJvZk.jpg",
        release_date: "2025-11-11",
        vote_average: 6.829,
        overview: "Now that Dan's assassin days are behind him, all he wants for Christmas is quality time with his kids."
    },
    {
        title: "Altered",
        poster_path: "/6QlAcGRaUrgHcZ4WTBh5lsPnzKx.jpg",
        release_date: "2025-09-18",
        vote_average: 6.471,
        overview: "In an alternate present, genetically enhanced humans dominate society. Outcasts Leon and Chloe fight for justice."
    },
    {
        title: "Zootopia 2",
        poster_path: "/oJ7g2CifqpStmoYQyaLQgEU32qO.jpg",
        release_date: "2025-11-26",
        vote_average: 7.3,
        overview: "After cracking the biggest case in Zootopia's history, rookie cops Judy Hopps and Nick Wilde find themselves on the twisting trail."
    },
    {
        title: "Frankenstein",
        poster_path: "/g4JtvGlQO7DByTI6frUobqvSL3R.jpg",
        release_date: "2025-10-17",
        vote_average: 7.765,
        overview: "Dr. Victor Frankenstein, a brilliant but egotistical scientist, brings a creature to life in a monstrous experiment."
    },
    {
        title: "Wicked: For Good",
        poster_path: "/si9tolnefLSUKaqQEGz1bWArOaL.jpg",
        release_date: "2025-11-19",
        vote_average: 6.804,
        overview: "As an angry mob rises against the Wicked Witch, Glinda and Elphaba will need to come together one final time."
    },
    {
        title: "A Legend",
        poster_path: "/qbImUt1d3itXcB81BCItPZlfbyr.jpg",
        release_date: "2024-07-05",
        vote_average: 6.8,
        overview: "An archeologist noticed that the texture of the relics discovered during the excavation of a glacier."
    }
];

async function fetchTrendingFilms() {
    try {
        const response = await fetch(`${API_BASE_URL}?api_key=${API_KEY}`);
        if (!response.ok) throw new Error('API Error');
        const data = await response.json();
        displayFilms(data.results);
    } catch (error) {
        console.error('Error fetching films:', error);
        console.log('Using fallback data...');
        displayFilms(fallbackFilms);
    }
}

function displayFilms(films) {
    filmsContainer.innerHTML = '';
    films.forEach(film => {
        const filmCard = document.createElement('div');
        filmCard.className = 'film-card';
        const posterUrl = film.poster_path ? `${IMG_BASE_URL}${film.poster_path}` : 'https://via.placeholder.com/250x300?text=No+Image';
        const releaseDate = film.release_date || 'N/A';
        const rating = film.vote_average ? film.vote_average.toFixed(1) : 'N/A';
        
        filmCard.innerHTML = `
            <img src="${posterUrl}" alt="${film.title}" class="film-poster">
            <div class="film-info">
                <h3>${film.title}</h3>
                <p class="film-release">Release: ${releaseDate}</p>
                <p class="film-rating">⭐ ${rating}/10</p>
                <p class="film-overview">${film.overview.substring(0, 100)}...</p>
            </div>
        `;
        filmsContainer.appendChild(filmCard);
    });
}

// Load films when page loads
fetchTrendingFilms();