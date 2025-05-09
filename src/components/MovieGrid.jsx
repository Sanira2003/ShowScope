import React from "react";
import MovieCard from "./MovieCard";
import "../css/MovieGrid.css";

const MovieGrid = ({ movies, title }) => {
  console.log(movies);
  if (!movies || movies.length === 0) {
    return (
      <div className="movie-grid">
        <h2 className="movie-title">{title}</h2>
        <p className="error-msg">No movies found.</p>
      </div>
    );
  }
  return (
    <div className="movie-grid">
      <h2 className="movie-title">{title}</h2>
      <div className="movies">
        {movies.map((movie) => (
          <div className="movie-shower">
            <MovieCard key={movie.id} movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieGrid;
