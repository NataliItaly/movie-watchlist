const movieNameInput = document.getElementById("movie-name");
const movieList = document.getElementById("movie-list");
const movieSearchForm = document.getElementById("movie-search-form");
const explore = document.getElementById("explore");
const apiKey = "e2485c75";

movieSearchForm.addEventListener("click", function (event) {
  event.preventDefault();
  const movieName = movieNameInput.value.trim().toLowerCase();

  if (movieName) {
    let requestStr = `http://www.omdbapi.com/?s=${movieName}&apikey=${apiKey}`;

    fetch(requestStr)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.Search);
        explore.classList.add("hidden");
        const moviesArr = data.Search;
        moviesArr.forEach((movie) => {
          console.log(movie.imdbID);
          const requestMovieStr = `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`;
          console.log(requestMovieStr);
          fetch(requestMovieStr)
            .then((response) => response.json())
            .then((movieData) => {
              console.log(movieData);
              movieList.innerHTML += generateMovieHTML(movieData);
            });
        });
      });
  }
});

function generateMovieHTML(data) {
  const imgSrc = data.Poster === "N/A" ? "images/no-image.jpg" : data.Poster;
  const rating = data.Rating === "N/A" ? "Not available" : data.imdbRating;
  const runtime = data.Runtime === "N/A" ? "" : data.Runtime;
  const actors = data.Actors === "N/A" ? "not available" : data.Actors;
  const plot = data.Plot === "N/A" ? "Description is not available" : data.Plot;

  return `
        <li class="movie">
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
                  <button class="movie__btn">
                    <img src="images/add-movie.svg" alt="add to watchlist" />
                    <span>Watchlist</span>
                  </button>
                </div>
                <div class="movie__actors">Actors: ${actors}</div>
                <div class="movie__description">${plot}</div>
              </div>
            </li>
    `;
}
