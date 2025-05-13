import React, { useEffect, useState } from "react";
import "../css/ProfileAndEditProfile.css";
import { useAuth } from "../contexts/AuthContext";
import { useUserdata } from "../contexts/UserdataContext";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const { userData, removeUserdata } = useUserdata();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await logout();
      removeUserdata();
      navigate("/");
    } catch (err) {
      console.log(err);
      setError("Error Logout");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    !currentUser && navigate("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  return loading ? (
    <Loading />
  ) : (
    userData && (
      <div className="page profile-page">
        <h1>My Profile</h1>
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-photo">
              {userData.photoURL ? (
                <img src={userData.photoURL} alt=" " />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#999"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              )}
            </div>
            <h2 className="profile-name">{userData.name || "User"}</h2>
            <div className="profile-country">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="10" r="3"></circle>
                <path d="M12 2a8 8 0 0 0-8 8c0 1.892.402 3.13 1.5 4.5L12 22l6.5-7.5c1.098-1.37 1.5-2.608 1.5-4.5a8 8 0 0 0-8-8z"></path>
              </svg>
              <p>{userData.country || "Add country"}</p>
            </div>
          </div>

          <div className="profile-details">
            <p className="profile-bio">{userData.bio || "Add bio."}</p>

            <div className="detail-items">
              <div className="detail-item">
                <p className="detail-label">Email:</p>
                <p className="detail-value">{userData.email}</p>
              </div>
              <div className="detail-item">
                <p className="detail-label">Favorite Genre:</p>
                <p className="detail-value">
                  {userData.favoriteGenres || "Add favorite genre"}
                </p>
              </div>

              <div className="detail-item">
                <p className="detail-label">Favorite Movie:</p>
                <div className="detail-value">
                  <div className="favorite-movie">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <p>
                      {userData.favoriteMovie || "Add the most favorite movie."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="buttons">
              <button
                className="edit-btn"
                onClick={() => navigate("/editProfile")}
              >
                Edit Profile
              </button>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
            <p className="error-msg">{error}</p>
          </div>
        </div>
      </div>
    )
  );
};

export default Profile;
