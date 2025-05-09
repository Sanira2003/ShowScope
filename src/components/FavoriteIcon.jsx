import React, { useState } from "react";
import { Heart } from "lucide-react";
import "../css/FavoriteIcon.css";

const FavoriteIcon = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div
      className="fav-btn-container"
      onClick={() => setIsFavorite(!isFavorite)}
    >
      <Heart
        color={isFavorite ? "#e50914" : "rgb(204, 204, 204, .8)"}
        size={18}
        fill={isFavorite ? "#e50914" : "transparent"}
      />
    </div>
  );
};

export default FavoriteIcon;
