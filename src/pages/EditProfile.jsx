import React, { useEffect, useState, useRef } from "react";
import { useUserdata } from "../contexts/UserdataContext";
import "../css/ProfileAndEditProfile.css";
import { Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import axios from "axios";

const EditProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [newUserData, setNewUserData] = useState({});
  const [image, setImage] = useState(null);
  const { userData, updateUserData } = useUserdata();
  const navigate = useNavigate();
  const isFirstRender = useRef(true);

  const handleSaveData = async () => {
    setIsLoading(true);
    try {
      await updateUserData(newUserData);
      navigate("/profile", { state: { updated: true } });
    } catch (err) {
      console.log(err);
      setError("Error save data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadImage = (e) => {
    setImage(e.target.files[0]);
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const uploadToCloudinary = async () => {
      if (!image) return setError("Please select an image first.");
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "unsigned_uploads");

      try {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dgnlf4c5d/image/upload",
          formData
        );
        const imageURL = res.data.secure_url;
        setNewUserData((prev) => {
          return { ...prev, photoURL: imageURL };
        });
      } catch (error) {
        console.error("Upload failed:", error);
        setError("Image upload failed!");
      } finally {
        setIsLoading(false);
      }
    };
    uploadToCloudinary();
  }, [image]);

  useEffect(() => {
    setNewUserData(userData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    userData && (
      <div className="page profile-page">
        <h1>Edit Profile</h1>
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-photo">
              {newUserData.photoURL ? (
                <img src={newUserData.photoURL} alt=" " />
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
              <label htmlFor="changeProfilePhoto" className="edit-photo-lable">
                <div className="edit-photo">
                  <Pencil />
                </div>
              </label>
              <input
                type="file"
                accept="image/*"
                id="changeProfilePhoto"
                className="photo-input"
                onChange={handleUploadImage}
              />
            </div>

            <h2 className="profile-name">
              <input
                placeholder="Add name."
                value={newUserData.name}
                onChange={(e) =>
                  setNewUserData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="edit-input"
              />
            </h2>
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
              <input
                placeholder="Add country."
                value={newUserData.country}
                onChange={(e) =>
                  setNewUserData((prev) => ({
                    ...prev,
                    country: e.target.value,
                  }))
                }
                className="edit-input"
              />
            </div>
          </div>

          <div className="profile-details">
            <div className="profile-bio">
              <textarea
                placeholder="Add bio."
                value={newUserData.bio}
                onChange={(e) =>
                  setNewUserData((prev) => ({ ...prev, bio: e.target.value }))
                }
                className="edit-input"
              />
            </div>

            <div className="detail-items">
              <div className="detail-item">
                <p className="detail-label">Email:</p>
                <input
                  placeholder="Add email."
                  value={newUserData.email}
                  className="edit-input"
                />
              </div>
              <div className="detail-item">
                <p className="detail-label">Favorite Genre:</p>
                <select
                  className="edit-input"
                  onChange={(e) =>
                    setNewUserData((prev) => ({
                      ...prev,
                      favoriteGenre: e.target.value,
                    }))
                  }
                >
                  <option value=" ">Select your favorite genre</option>
                  <option value="Action">Action</option>
                  <option value="Comedy">Comedy</option>
                  <option value="Drama">Drama</option>
                  <option value="Horror">Horror</option>
                  <option value="Sci-Fi">Sci-Fi</option>
                  <option value="Thriller">Thriller</option>
                  <option value="Romance">Romance</option>
                </select>
              </div>

              <div className="detail-item">
                <p className="detail-label">Favorite Movie:</p>
                <input
                  placeholder="Add favorite movie."
                  value={newUserData.favoriteMovie}
                  onChange={(e) =>
                    setNewUserData((prev) => ({
                      ...prev,
                      favoriteMovie: e.target.value,
                    }))
                  }
                  className="edit-input"
                />
              </div>
            </div>
            <div className="buttons">
              <button className="save-btn" onClick={handleSaveData}>
                Save
              </button>
              <button
                className="cancel-btn"
                onClick={() => {
                  navigate("/profile");
                }}
              >
                Cancel
              </button>
            </div>
            <p className="error-msg">{error}</p>
          </div>
        </div>
      </div>
    )
  );
};

export default EditProfile;
