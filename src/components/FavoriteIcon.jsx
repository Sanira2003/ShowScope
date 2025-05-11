import React from "react";
import { Heart } from "lucide-react";
import "../css/FavoriteIcon.css";
import { useUserdata } from "../contexts/UserdataContext";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const FavoriteIcon = ({ movie }) => {
  const { addToFavorites, removeFromFavorites, isFavoriteMovie } =
    useUserdata();
  const { currentUser } = useAuth();

  const navigate = useNavigate();

  const handleFavorite = () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    if (isFavoriteMovie(movie)) removeFromFavorites(movie);
    else addToFavorites(movie);
  };

  return (
    <div className="fav-btn-container" onClick={handleFavorite}>
      <Heart
        color={isFavoriteMovie(movie) ? "#e50914" : "rgb(204, 204, 204, .8)"}
        size={18}
        fill={isFavoriteMovie(movie) ? "#e50914" : "transparent"}
      />
    </div>
  );
};

export default FavoriteIcon;
