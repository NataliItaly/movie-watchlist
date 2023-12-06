import { generateMovieHTML } from "./generateMovieHTML.js";
import { userWatchlist } from "./userWatchlist.js";

const exploreWatchlist = document.getElementById("explore__watchlist");
const watchlist = document.getElementById("watchlist");
console.log(userWatchlist);
if (userWatchlist.length > 0) {
  exploreWatchlist.classList.add("hidden");
  //localStorage.setItem("userWatchlist", JSON.stringify(userWatchlist));
  userWatchlist.forEach((movie) =>
    watchlist.insertAdjacentHTML("afterbegin", generateMovieHTML(movie, true))
  );
}

window.addEventListener("click", function (event) {
  if (event.target.classList.contains("movie__btn")) {
    console.log(event.target.classList);
    event.target.classList.remove("movie__btn_added");
    const movieId = event.target.closest(".movie").dataset.movie;
    let newUserWatchlist = userWatchlist.filter(
      (movie) => movie.imdbID != movieId
    );
    console.log(newUserWatchlist);
    localStorage.setItem("userWatchlist", JSON.stringify(newUserWatchlist));
    watchlist.innerHTML = "";
    JSON.parse(localStorage.getItem("userWatchlist")).forEach((movie) =>
      watchlist.insertAdjacentHTML("afterbegin", generateMovieHTML(movie, true))
    );
  }
});
