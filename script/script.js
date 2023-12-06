import { generateMovieHTML } from "./generateMovieHTML.js";
import { userWatchlist } from "./userWatchlist.js";

/*Access to script at 'file:///C:/Users/Lenovo/Desktop/FRONTEND/SCRIMBA/Movie-app-watchlist/movie-watchlist/script/script.js' from origin 'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: http, data, isolated-app, chrome-extension, chrome-untrusted, https, edge. */

/* const userWatchlist = JSON.parse(localStorage.getItem("userWatchlist"))
  ? JSON.parse(localStorage.getItem("userWatchlist"))
  : localStorage.setItem("userWatchlist", JSON.stringify([]));
 */
const movieNameInput = document.getElementById("movie-name");
const movieList = document.getElementById("movie-list");
const movieSearchForm = document.getElementById("movie-search-form");
const explore = document.getElementById("explore");

const apiKey = "e2485c75";

movieSearchForm.addEventListener("click", function (event) {
  event.preventDefault();
  movieList.innerHTML = "";
  const movieName = movieNameInput.value.trim().toLowerCase();

  if (movieName) {
    let requestStr = `http://www.omdbapi.com/?s=${movieName}&apikey=${apiKey}`;

    fetch(requestStr)
      .then((response) => response.json())
      .then((data) => {
        const moviesArr = data.Search;
        moviesArr.forEach((movie) => {
          const requestMovieStr = `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`;

          fetch(requestMovieStr)
            .then((response) => response.json())
            .then((movieData) => {
              explore.classList.add("hidden");
              movieList.innerHTML += generateMovieHTML(movieData, false);
            });
        });
      })
      .catch((err) => {
        explore.innerHTML =
          "Unable to find what you’re looking for. Please try another search.";
      });
  }
});

window.addEventListener("click", function (event) {
  if (event.target.classList.contains("movie__btn")) {
    event.target.classList.toggle("movie__btn_added");
    const movieId = event.target.closest(".movie").dataset.movie;

    if (event.target.classList.contains("movie__btn_added")) {
      fetch(`http://www.omdbapi.com/?i=${movieId}&apikey=${apiKey}`)
        .then((response) => response.json())
        .then((movieData) => {
          const newMovie = {
            Title: movieData.Title,
            Poster: movieData.Poster,
            imdbRating: movieData.imdbRating,
            Year: movieData.Year,
            Country: movieData.Country,
            Runtime: movieData.Runtime,
            Genre: movieData.Genre,
            Actors: movieData.Actors,
            Plot: movieData.Plot,
            imdbID: movieId,
          };
          console.log(newMovie);
          console.log(userWatchlist);
          userWatchlist.push(newMovie);
          localStorage.setItem("userWatchlist", JSON.stringify(userWatchlist));
        });
    } else {
      //console.log(userWatchlist);
      let newUserWatchlist = userWatchlist.filter(
        (movie) => movie.imdbID != movieId
      );
      //console.log(userWatchlist);
      this.localStorage.setItem(
        "userWatchlist",
        JSON.stringify(newUserWatchlist)
      );
    }
    //console.log(event.target.closest(".movie").dataset.movie);
  }
});
/*
function generateMovieHTML(data, remove) {
  const imgSrc = data.Poster === "N/A" ? "images/no-image.jpg" : data.Poster;
  const rating = data.Rating === "N/A" ? "Not available" : data.imdbRating;
  const runtime =
    data.Runtime === "N/A" ? "runtime not available" : data.Runtime;
  const actors = data.Actors === "N/A" ? "not available" : data.Actors;
  const plot = data.Plot === "N/A" ? "Description is not available" : data.Plot;
  const btnClass = remove ? "movie__btn movie__btn_added" : "movie__btn";

  return `
        <li class="movie" data-movie=${data.imdbID}>
              <img src=${imgSrc} alt=${data.Title} class="movie__poster" />
              <div class="movie__data">
                <div class="movie__header">
                  <h2 class="movie__title">${data.Title}</h2>
                  <p class="movie__rate">
                    <img src="images/star.svg" alt="" />
                    <span class="movie__rating">${rating}</span>
                  </p>
                </div>
                <div class="movie__header">
                  <p class="movie__year">${data.Year}</p>
                  <p>${data.Country}</p>
                </div>
                <div class="movie__info">
                  <span class="movie__runtime">${runtime}</span>
                  <span class="movie__genre">${data.Genre}</span>
                  <button class=${btnClass}>
                    Watchlist
                  </button>
                </div>
                <div class="movie__actors">Actors: ${actors}</div>
                <div class="movie__description">${plot}</div>
              </div>
            </li>
    `;
} */
