import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "../services/tmdbApi";
import Loading from "../components/Loading";
import { getImageUrl } from "../services/tmdbApi";
import { Star } from "lucide-react";
import Cast from "../components/Cast";
import "../css/Movie.css";
import FavoriteIcon from "../components/FavoriteIcon";
import Footer from "../components/Footer";

const Movie = () => {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [filteredCrew, setFilteredCrew] = useState(null);
  const { id } = useParams();
  const jobsToShow = ["Director", "Screenplay", "Story", "Characters"];

  useEffect(() => {
    const handleGetMovie = async () => {
      setError("");
      setIsLoading(true);
      try {
        const result = await getMovieById(id);
        setMovie(result);
        setFilteredCrew(
          result.credits.crew.filter((member) =>
            jobsToShow.includes(member.job)
          )
        );
      } catch (err) {
        setError(err);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    handleGetMovie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return isLoading ? (
    <Loading />
  ) : (
    movie && (
      <>
        <div className="page page-movie">
          <img
            className="background-img"
            src={getImageUrl(movie.backdrop_path)}
            alt={movie.title}
          />
          <div className="header">
            <div className="movie">
              <div className="movie-poster-img">
                <img src={getImageUrl(movie.poster_path)} alt={movie.title} />
                <FavoriteIcon movie={movie} />
              </div>
              <div className="movie-about">
                <h1 className="movie-title">
                  <strong>{movie.title}</strong> (
                  {new Date(movie.release_date).getFullYear()})
                </h1>
                <div className="genre-runtime">
                  <p className="genres">
                    {movie.genres.map((genre) => genre.name).join(", ")}
                  </p>
                  <p className="runtime">{`${Math.floor(
                    Number(movie.runtime) / 60
                  )}h ${Number(movie.runtime) % 60}m`}</p>
                </div>
                <p>{`${movie.origin_country[0]} [${movie.original_language}]`}</p>
                <p className="vote-average">
                  {" "}
                  <Star size={18} color="gold" />
                  {Number(movie.vote_average).toFixed(1)}
                </p>
                <p className="tagline">
                  <strong>{movie.tagline}</strong>
                </p>
                <h3>Overview</h3>
                <p className="movie-overview">{movie.overview}</p>
                <div className="crew">
                  {filteredCrew?.map((person, index) => (
                    <p key={index}>
                      <strong>{person.name}</strong>
                      <br />
                      {person.job}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <div className="cast-container">
              {movie.credits.cast.map((cast) => (
                <Cast cast={cast} key={cast.id} />
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  );
};

export default Movie;
