import React, { useEffect, useState } from "react";
import MovieGrid from "../components/MovieGrid";
import { searchMovies } from "../services/tmdbApi";
import { useUserdata } from "../contexts/UserdataContext";
import Loading from "../components/Loading";

const Serach = () => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { searchQuery } = useUserdata();

  useEffect(() => {
    if (searchQuery.length === 0) return setError("Enter a movie.");
    const handleSearchMovies = async () => {
      setError("");
      setIsLoading(true);
      try {
        const results = await searchMovies(searchQuery);
        setResult(results.results);
      } catch (err) {
        console.log(err);
        setError("Error find Movie");
      } finally {
        setIsLoading(false);
      }
    };
    handleSearchMovies();
  }, [searchQuery]);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="page">
      <MovieGrid
        movies={result}
        title={`Search result: ${searchQuery}`}
        error={error}
      />
    </div>
  );
};

export default Serach;
