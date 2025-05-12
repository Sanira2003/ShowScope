import React from "react";
import MovieGrid from "../components/MovieGrid";
import { useUserdata } from "../contexts/UserdataContext";

const Favourite = () => {
  const { favoriteMovies } = useUserdata();

  return (
    <div className="page">
      <MovieGrid movies={favoriteMovies} title="Favorite Movies" />
    </div>
  );
};

export default Favourite;
