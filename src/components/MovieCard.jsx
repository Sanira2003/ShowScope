import React from "react";
import { Link } from "react-router-dom";
import { getImageUrl } from "../services/tmdbApi";
import { Star } from "lucide-react";
import FavoriteIcon from "./FavoriteIcon";
import "../css/MovieCard.css";

const MovieCard = ({ movie }) => {
  const { id, title, poster_path, vote_average, release_date } = movie;

  return (
    <div className="movie-card">
      <FavoriteIcon movie={movie} />
      <Link to={`/movies/${id}`}>
        <img
          src={getImageUrl(poster_path)}
          alt={title}
          className="movie-poster"
        />
        <div className="movie-info">
          <h3 className="movie-name">{title}</h3>
          <div className="movie-description">
            <p>{new Date(release_date).getFullYear()}</p>
            <span className="rating">
              <Star color="gold" size={15} />
              <p>{Number(vote_average).toFixed(1)}</p>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
