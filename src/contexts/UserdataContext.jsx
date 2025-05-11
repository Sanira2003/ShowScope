import React, { useState, createContext, useContext, useEffect } from "react";
import { db } from "../services/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "./AuthContext";

const UserdataContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useUserdata = () => useContext(UserdataContext);

export const UserdataProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const { currentUser } = useAuth();

  const getUserRef = (user) => {
    return doc(db, "users", user.uid);
  };

  const getUserDoc = async (user) => {
    const userRef = getUserRef(user);
    const docSnap = await getDoc(userRef);
    return docSnap;
  };

  const createUserDocumentIfNotExists = async (user) => {
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
      console.log("newdata");
    } else setUserData(docSnap.data());
  };

  const removeUserdata = () => {
    setUserData({});
  };

  useEffect(() => {
    const initializeUserData = async () => {
      if (currentUser) {
        const docSnap = await getUserDoc(currentUser);
        setUserData(docSnap.data());
      }
    };
    initializeUserData();
  }, []);

  const value = {
    createUserDocumentIfNotExists,
    userData,
    removeUserdata,
  };

  return (
    <UserdataContext.Provider value={value}>
      {children}
    </UserdataContext.Provider>
  );
};
