const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.querySelector('main');
const form = document.querySelector('#form');
const search = document.querySelector('.search');
const gotoPageForm = document.querySelector('#goto-page-no-form');
const gotoPageSearch = document.querySelector('.goto-page-no');
const home = document.querySelector('.home');
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
const pageText = document.getElementById('page-no');
const topButton = document.getElementById("top-btn");
let page = 1;

getMovies(APIURL + page);

home.addEventListener('click', () => {
    location.reload();
});

next.addEventListener('click', () => {
    page++;
    getMovies(APIURL + page);
});

prev.addEventListener('click', () => {

    page--;
    getMovies(APIURL + page);
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchText = search.value;
    if (searchText) {
        const btn = document.querySelector('.btn');
        btn.classList.add('hidden');
        getMovies(SEARCHAPI + searchText, true);
        search.value = '';
    }
});

gotoPageForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchText = gotoPageSearch.value;
    if (searchText > 0) {
        page = searchText;
        getMovies(APIURL + searchText);
        gotoPageSearch.value = '';
    } else {
        page = 1;
        getMovies(APIURL + 1);
        gotoPageSearch.value = '';
    }
});

// When the user clicks on the button, scroll to the top of the document
topButton.addEventListener("click", () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
});

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        topButton.style.display = "block";
    } else {
        topButton.style.display = "none";
    }
}

async function getMovies(url, showSearch = false) {
    const resp = await fetch(url);
    const respData = await resp.json();

    if (page > 1) {
        prev.classList.remove('hidden');
    } else {
        prev.classList.add('hidden');
    }

    showMovies(respData.results, showSearch);
}

function showMovies(movies, showSearch) {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    if (showSearch) {
        pageText.innerText = '';
        pageText.innerText = 'Search Results :';
    } else {
        pageText.innerText = `Page : ${page}`;
    }

    main.innerHTML = '';
    movies.forEach((movie) => {
        const { poster_path, title, vote_average, overview } = movie;

        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `<img src="${IMGPATH + poster_path}" alt="${title}">
                                <div class="movie-info">
                                    <h3>${title}</h3>
                                    <span class="${getClassByRate(vote_average)}">${vote_average}</span>
                                </div>
                                <div class="overview">
                                    <h3>Overview:</h3>${overview}
                                </div>`;

        main.appendChild(movieElement);
    });
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}