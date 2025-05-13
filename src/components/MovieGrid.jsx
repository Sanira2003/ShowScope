import React from "react";
import MovieCard from "./MovieCard";
import "../css/MovieGrid.css";

const MovieGrid = ({ movies, title, error }) => {
  if (!movies || movies.length === 0) {
    return (
      <div className="movie-grid">
        <h2 className="movie-title">{title}</h2>
        <p className="error-msg">{error ? error : "No movies to show."}</p>
      </div>
    );
  }
  return (
    <div className="movie-grid">
      <h2 className="movie-title">{title}</h2>
      <div className="movies">
        {movies.map((movie) =>
          movie.poster_path ? (
            <div key={movie.id} className="movie-shower">
              <MovieCard movie={movie} />
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default MovieGrid;
