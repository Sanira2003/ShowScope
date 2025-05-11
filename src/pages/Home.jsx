import React, { useEffect, useState } from "react";
import MovieGrid from "../components/MovieGrid";
import { getPopulerMovies, getTrendingMovies } from "../services/tmdbApi";
import Loading from "../components/Loading";
import { useUserdata } from "../contexts/UserdataContext";

const Home = () => {
  const { userData } = useUserdata();
  console.log(userData);
  const [populeMovies, setPopulerMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTrendingMovies = async () => {
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
      try {
        const populerResult = await getPopulerMovies();
        setPopulerMovies(populerResult.results);
      } catch (e) {
        console.log(e);
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    loadPopulerMovies();
  }, []);

  if (error) console.log(error);

  return loading ? (
    <Loading />
  ) : (
    <div className="page">
      <MovieGrid movies={trendingMovies} title="Trending Movies" />
      <MovieGrid movies={populeMovies} title="Popular Movies" />
    </div>
  );
};

export default Home;
