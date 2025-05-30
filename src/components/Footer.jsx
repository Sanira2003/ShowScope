import React from "react";
import { Link } from "react-router-dom";
import { useUserdata } from "../contexts/UserdataContext";
import { Home, Heart, User } from "lucide-react";
import "../css/Footer.css";
import tmdbLogo from "../assets/tmdb.svg";

const Footer = () => {
  const { userData } = useUserdata();
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-about">
          <h2>
            Show<span className="colored">Scope</span>
          </h2>
          <p>
            ShowScope is your gateway to the world of cinema. Discover trending
            movies, explore detailed information, and build your personal list
            of favorites — all in one sleek and user-friendly interface.
          </p>
        </div>

        <div className="footer-links">
          <h3>Navigate to</h3>
          <ul>
            <li>
              <Home size="15" />
              <Link to={"/"}>
                <p>Home</p>
              </Link>
            </li>
            <li>
              <Heart size="15" />
              <Link to={"/favorite"}>
                <p>Favorites</p>
              </Link>
            </li>
            <li>
              {<User size="15" />}
              <Link to={userData ? "/profile" : "/login"}>
                <p>{userData ? userData.name.split(" ")[0] : "Login"}</p>
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer-links">
          <h3>Contact me</h3>
          <ul>
            <li>
              <a
                href="https://mail.google.com/mail/u/0/?fs=1&to=sanira.adesha@gmail.com&tf=cm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <p>Gmail</p>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/Sanira2003"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/sanira-deneth-615013320/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 ShowScope. All rights reserved.</p>
        <p>Project by Sanira Adesha</p>
        <p>
          This product uses the TMDB API but is not endorsed or certified by
          TMDB.
        </p>
        <Link
          className="link"
          to={"https://www.themoviedb.org/"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={tmdbLogo}
            alt="TMDB Logo"
            style={{ height: "30px", marginTop: "5px" }}
          />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
