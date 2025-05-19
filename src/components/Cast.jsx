import React from "react";
import { getImageUrl } from "../services/tmdbApi";
import "../css/Cast.css";

const Cast = ({ cast }) => {
  const { character, profile_path, name } = cast;
  return (
    profile_path && (
      <div className="cast">
        <img src={getImageUrl(profile_path)} alt={name} />
        <div className="cast-info">
          <p>
            <strong>{name}</strong>
          </p>
          <p>{character}</p>
        </div>
      </div>
    )
  );
};

export default Cast;
