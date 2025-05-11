import React, { useState, createContext, useContext, useEffect } from "react";
import { db } from "../services/firebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "./AuthContext";

const UserdataContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useUserdata = () => useContext(UserdataContext);

export const UserdataProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [favoriteMovies, setFavouriteMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useAuth();

  const getUserRef = (user) => doc(db, "users", user.uid);

  const getUserDoc = async (user) => {
    try {
      const userRef = getUserRef(user);
      return await getDoc(userRef);
    } catch (err) {
      console.error("Error fetching user doc:", err);
      throw err;
    }
  };

  const createUserDocumentIfNotExists = async (user) => {
    setIsLoading(true);
    try {
      const userRef = getUserRef(user);
      const docSnap = await getUserDoc(user);

      if (!docSnap.exists()) {
        const newUserData = {
          email: user.email,
          name: user.displayName || "",
          photoURL: user.photoURL || "",
          country: "",
          favoriteMovies: [],
          favoriteMovie: "",
          favoriteGenres: [],
          bio: "",
        };
        await setDoc(userRef, newUserData);
        setUserData(newUserData);
      } else {
        setUserData(docSnap.data());
      }
    } catch (err) {
      console.error("Error creating user document:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const removeUserdata = () => {
    setUserData(null);
  };

  const addToFavorites = (movie) => {
    setFavouriteMovies((prev) => {
      const exists = prev.some((m) => m.id === movie.id);
      return exists ? prev : [...prev, movie];
    });
  };

  const removeFromFavorites = (movie) => {
    const updateMovies = favoriteMovies.filter((m) => m.id !== movie.id);
    setFavouriteMovies(updateMovies);
  };

  const isFavoriteMovie = (movie) => {
    return favoriteMovies.some((m) => m.id === movie.id);
  };

  useEffect(() => {
    const updateFavoriteMovies = async () => {
      if (!currentUser) return;
      try {
        const userRef = doc(db, "users", currentUser.uid);
        await updateDoc(userRef, { favoriteMovies: favoriteMovies });
        console.log("Updated Firestore successfully!");
      } catch (error) {
        console.error("Failed to update Firestore:", error);
      }
    };
    updateFavoriteMovies();
  }, [favoriteMovies, currentUser]);

  useEffect(() => {
    const initializeUserData = async () => {
      if (currentUser) {
        setIsLoading(true);
        try {
          const docSnap = await getUserDoc(currentUser);
          setUserData(docSnap.data());
          setFavouriteMovies(userData.favoriteMovies);
        } catch (err) {
          console.error("Error initializing user data:", err);
        } finally {
          setIsLoading(false);
        }
      }
    };
    initializeUserData();
  }, []);

  const value = {
    createUserDocumentIfNotExists,
    userData,
    removeUserdata,
    favoriteMovies,
    addToFavorites,
    removeFromFavorites,
    isFavoriteMovie,
  };

  return (
    <UserdataContext.Provider value={value}>
      {!isLoading && children}
    </UserdataContext.Provider>
  );
};
