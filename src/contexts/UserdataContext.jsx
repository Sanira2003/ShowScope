import React, { useState, createContext, useContext, useEffect } from "react";
import { db } from "../services/firebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "./AuthContext";

const UserdataContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useUserdata = () => useContext(UserdataContext);

export const UserdataProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
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
          favoriteGenre: "",
          bio: "",
        };
        await setDoc(userRef, newUserData);
        setUserData(newUserData);
      } else {
        setUserData(docSnap.data());
      }
    } catch (err) {
      console.error("Error creating user document:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserData = async (newUserData) => {
    setIsLoading(true);
    try {
      const userRef = getUserRef(currentUser);
      await updateDoc(userRef, newUserData);
      setUserData((prev) => {
        return { ...prev, ...newUserData };
      });
    } catch (err) {
      console.error("Failed to update Firestore:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const removeUserdata = () => {
    setUserData(null);
  };

  const addToFavorites = (movie) => {
    setFavoriteMovies((prev) => {
      const exists = prev.some((m) => m.id === movie.id);
      return exists ? prev : [...prev, movie];
    });
  };

  const removeFromFavorites = (movie) => {
    setFavoriteMovies(favoriteMovies.filter((m) => m.id !== movie.id));
  };

  const isFavoriteMovie = (movie) => {
    return favoriteMovies.some((m) => m.id === movie.id);
  };

  useEffect(() => {
    if (userData && currentUser) {
      const updateFavoriteMovies = async () => {
        try {
          const userRef = getUserRef(currentUser);
          await updateDoc(userRef, { favoriteMovies });
        } catch (err) {
          console.error("Failed to update Firestore:", err);
        }
      };
      updateFavoriteMovies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favoriteMovies]);

  useEffect(() => {
    const initializeUserData = async () => {
      if (currentUser) {
        setIsLoading(true);
        try {
          const docSnap = await getUserDoc(currentUser);
          const data = docSnap.data();
          setUserData(data);
          setFavoriteMovies(data.favoriteMovies);
        } catch (err) {
          console.error("Error initializing user data:", err);
        } finally {
          setIsLoading(false);
        }
      } else setFavoriteMovies([]);
    };
    initializeUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const value = {
    createUserDocumentIfNotExists,
    userData,
    removeUserdata,
    favoriteMovies,
    addToFavorites,
    removeFromFavorites,
    isFavoriteMovie,
    updateUserData,
  };

  return (
    <UserdataContext.Provider value={value}>
      {!isLoading && children}
    </UserdataContext.Provider>
  );
};
