export let userWatchlist = JSON.parse(localStorage.getItem("userWatchlist"))
  ? JSON.parse(localStorage.getItem("userWatchlist"))
  : localStorage.setItem("userWatchlist", JSON.stringify([]));
