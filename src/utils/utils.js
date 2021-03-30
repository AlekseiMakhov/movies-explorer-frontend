export function searchMovies (movies, filter) {
    return movies.filter(movie => filter.test(movie.nameRU)
        || filter.test(movie.nameEN) || filter.test(movie.description) || filter.test(movie.director) 
        && movie);
}