const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=a4f05e897c705c3f48910479e050245b&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?api_key=a4f05e897c705c3f48910479e050245b&query=';
const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.querySelector('#main');


async function getMovies(url) {
    const response = await fetch(url);
    const data = await response.json();
    showMovies(data.results);
}

function showMovies(movies) {
    main.innerHTML = ''; // Clear any previous results
    movies.forEach(movie => {
        const { title, poster_path, vote_average, overview } = movie;
        const formattedVote = parseFloat(vote_average).toFixed(1);
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${formattedVote}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `;
        main.appendChild(movieEl);
    });
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green';  
    } else if (vote >= 5) {
        return 'orange'; 
    } else {
        return 'red';
    }
}

form.addEventListener('submit', function (event) {
    event.preventDefault();
    const searchTerm = search.value.trim();
    if (searchTerm) {
        getMovies(SEARCH_URL + encodeURIComponent(searchTerm));
    } else {
        window.location.reload(); // Optionally handle empty search by reloading or clearing current display
    }
});

document.getElementById('homeLink').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default anchor click behavior
    location.reload(); // Reload the page to the initial state
});
