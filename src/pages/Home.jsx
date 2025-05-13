import React, { useEffect, useState, useRef } from "react";
import MovieGrid from "../components/MovieGrid";
import { getPopulerMovies, getTrendingMovies } from "../services/tmdbApi";
import Loading from "../components/Loading";

const Home = () => {
  const [populeMovies, setPopulerMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    console.log(isFirstRender.current);
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const loadTrendingMovies = async () => {
      setError("");
      setLoading(true);
      try {
        const trendingResult = await getTrendingMovies();
        setTrendingMovies(trendingResult.results);
      } catch (e) {
        console.log(e);
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    loadTrendingMovies();
  }, []);

  useEffect(() => {
    const loadPopulerMovies = async () => {
      setError("");
      setLoading(true);
      try {
        const populerResult = await getPopulerMovies();
        setPopulerMovies(populerResult.results);
      } catch (err) {
        console.log(err);
        setError("Error loading movie");
      } finally {
        setLoading(false);
      }
    };
    loadPopulerMovies();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <div className="page">
      <MovieGrid
        movies={trendingMovies}
        title="Trending Movies"
        error={error}
      />
      <MovieGrid movies={populeMovies} title="Popular Movies" error={error} />
    </div>
  );
};

export default Home;
