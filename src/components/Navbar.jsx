import React, { useEffect, useState } from "react";
import "../css/Navbar.css";
import { Link } from "react-router-dom";
import { Search, Moon, Sun, Menu, X } from "lucide-react";
import { getSearchMovie } from "../services/tmdbApi";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  const body = document.body;
  useEffect(() => {
    isDarkMode ? body.classList.add("dark") : body.classList.remove("dark");
  }, [isDarkMode]);

  const [isExpanded, setIsExpanded] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    isLargeScreen ? setIsExpanded(true) : setIsExpanded(false);
  }, [isLargeScreen]);

  const [movieName, setMovieName] = useState("");
  console.log(movieName);
  return (
    <header className="navbar">
      <Link to={"/"} className="logo">
        <h1>
          Show<span className="colored">Scope</span>
        </h1>
      </Link>
      <button
        className="menu-btn"
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          transform: isExpanded ? "rotateZ(180deg)" : "rotateZ(-180deg)",
          color: isExpanded && "transparent",
        }}
      >
        <Menu />
      </button>
      <nav className="toggle-menu" style={{ top: isExpanded ? "0" : "-100vh" }}>
        <button
          className="close-btn"
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            transform: isExpanded ? "rotateZ(180deg)" : "rotateZ(-180deg)",
          }}
        >
          <X />
        </button>
        <div className="search-movies">
          <input
            type="text"
            required
            placeholder="Search movies.."
            value={movieName}
            onChange={(event) => {
              setMovieName(event.target.value);
            }}
          />
          <button type="submit" onClick={getSearchMovie}>
            <Search size={18} />
          </button>
        </div>
        <ul className="navigations">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/favorite"}>Favorites</Link>
          </li>
          <li>
            <Link to={"/login"}>Login</Link>
          </li>
        </ul>
      </nav>
      <button
        className="mode"
        onClick={() => {
          setIsDarkMode(!isDarkMode);
        }}
      >
        {" "}
        {isDarkMode ? <Moon size={22} /> : <Sun size={22} />}
      </button>
    </header>
  );
};

export default Navbar;
