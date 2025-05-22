import React, { useEffect, useState } from "react";
import "../css/Navbar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, Moon, Sun, Menu, X, Heart, User, Home } from "lucide-react";
import { useUserdata } from "../contexts/UserdataContext";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  const [query, setQuery] = useState("");
  const body = document.body;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);
  const { setSearchQuery, userData } = useUserdata();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    isDarkMode ? body.classList.add("dark") : body.classList.remove("dark");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDarkMode]);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    isLargeScreen ? setIsExpanded(true) : setIsExpanded(false);
  }, [isLargeScreen]);

  useEffect(() => {
    !isLargeScreen && setIsExpanded(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <header className={`navbar ${isExpanded && "expanded"}`}>
      <Link to={"/"} className="logo">
        <h1>
          Show<span className="colored">Scope</span>
        </h1>
      </Link>
      <button className="menu-btn" onClick={() => setIsExpanded(!isExpanded)}>
        <Menu />
      </button>
      <nav className="toggle-menu">
        <button
          className="close-btn"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <X />
        </button>
        <form className="search-movies">
          <input
            type="text"
            required
            value={query}
            placeholder="Search movies.."
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              setSearchQuery(query);
              setQuery("");
              navigate("/search");
            }}
          >
            <Search size={18} />
          </button>
        </form>
        <ul className="navigations">
          <li>
            <Home size="15" />
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Heart size="15" />
            <Link to={"/favorite"}>Favorites</Link>
          </li>
          <li>
            {<User size="15" />}
            <Link to={userData ? "/profile" : "/login"}>
              {userData ? userData.name.split(" ")[0] : "Login"}
            </Link>
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
