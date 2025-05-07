import React, { useState } from "react";
import { Heart } from "lucide-react";

const FavoriteIcon = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div
      className="fav-btn-container"
      onClick={() => setIsFavorite(!isFavorite)}
    >
      <Heart color={!isFavorite ? "rgb(204, 204, 204, .5)" : "red"} size={20} />
    </div>
  );
};

export default FavoriteIcon;
