import React, { useEffect } from "react";
import MovieGrid from "../components/MovieGrid";
import { useUserdata } from "../contexts/UserdataContext";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Favourite = () => {
  const { favoriteMovies } = useUserdata();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    !currentUser && navigate("/login");
  });

  return (
    <div className="page">
      <MovieGrid
        movies={favoriteMovies}
        title="Favorite Movies"
        error="No favorite movies."
      />
    </div>
  );
};

export default Favourite;
