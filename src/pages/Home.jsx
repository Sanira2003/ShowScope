import React, { useEffect, useState } from "react";
import MovieGrid from "../components/MovieGrid";
import { getPopulerMovies } from "../services/tmdbApi";

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const loadPopulerMovies = async () => {
      try {
        const populerMovies = await getPopulerMovies();
        setMovies(populerMovies.results);
      } catch (error) {
        console.log(error);
      } finally {
        console.log(movies);
      }
    };
    loadPopulerMovies();
  }, []);
  return (
    <div className="home">
      <MovieGrid movies={movies} title={"Home"} />
    </div>
  );
};

export default Home;
