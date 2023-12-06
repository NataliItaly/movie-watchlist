export function generateMovieHTML(data, addClass) {
  const imgSrc = data.Poster === "N/A" ? "images/no-image.jpg" : data.Poster;
  const rating = data.Rating === "N/A" ? "Not available" : data.imdbRating;
  const runtime =
    data.Runtime === "N/A" ? "runtime not available" : data.Runtime;
  const actors = data.Actors === "N/A" ? "not available" : data.Actors;
  const plot = data.Plot === "N/A" ? "Description is not available" : data.Plot;
  const btnClass = addClass ? "movie__btn movie__btn_added" : "movie__btn";
  localStorage.clear();
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
                  <button class="${btnClass}">
                    Watchlist
                  </button>
                </div>
                <div class="movie__actors">Actors: ${actors}</div>
                <div class="movie__description">${plot}</div>
              </div>
            </li>
    `;
}
