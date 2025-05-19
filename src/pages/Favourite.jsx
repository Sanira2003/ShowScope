import React, { useEffect } from "react";
import MovieGrid from "../components/MovieGrid";
import { useUserdata } from "../contexts/UserdataContext";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const Favourite = () => {
  const { favoriteMovies } = useUserdata();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      alert("You need to be logged in to view favorites.");
    }
  });

  return (
    <div className="page">
      <MovieGrid
        movies={favoriteMovies.reverse()}
        title="Favorite Movies"
        error="Add favorite movies to view."
      />
      <Footer />
    </div>
  );
};

export default Favourite;
