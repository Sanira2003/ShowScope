import React from "react";
import { getImageUrl } from "../services/tmdbApi";
import "../css/Cast.css";

const Cast = ({ cast }) => {
  const { character, profile_path, name } = cast;
  return (
    profile_path && (
      <a
        href={`https://www.google.com/search?q=${encodeURIComponent(name)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="cast">
          <img src={getImageUrl(profile_path)} alt={name} />
          <div className="cast-info">
            <p>
              <strong>{name}</strong>
            </p>
            <p>{character}</p>
          </div>
        </div>
      </a>
    )
  );
};

export default Cast;
