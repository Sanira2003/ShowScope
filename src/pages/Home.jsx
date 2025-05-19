import React, { useEffect, useState, useRef } from "react";
import MovieGrid from "../components/MovieGrid";
import { getPopulerMovies, getTrendingMovies } from "../services/tmdbApi";
import Loading from "../components/Loading";
import Footer from "../components/Footer";

const Home = () => {
  const [populeMovies, setPopulerMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!isFirstRender.current) {
      return;
    }

    const loadTrendingMovies = async () => {
      setError("");
      setIsLoading(true);
      try {
        const trendingResult = await getTrendingMovies();
        setTrendingMovies(trendingResult.results);
        isFirstRender.current = false;
      } catch (e) {
        console.log(e);
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };
    loadTrendingMovies();
  }, []);

  useEffect(() => {
    const loadPopulerMovies = async () => {
      setError("");
      setIsLoading(true);
      try {
        const populerResult = await getPopulerMovies();
        setPopulerMovies(populerResult.results);
      } catch (err) {
        console.log(err);
        setError("Error loading movie");
      } finally {
        setIsLoading(false);
      }
    };
    loadPopulerMovies();
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="page">
      <MovieGrid
        movies={trendingMovies}
        title="Trending Movies"
        error={error}
      />
      <MovieGrid movies={populeMovies} title="Popular Movies" error={error} />
      <Footer />
    </div>
  );
};

export default Home;
