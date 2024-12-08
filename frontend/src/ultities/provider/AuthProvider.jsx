import React, { createContext, useEffect, useState } from "react";
import { app } from "../../config/firebase.init";

import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const auth = getAuth(app);

  //sign up user
  const signUp = async (email, password) => {
    try {
      setLoader(true);
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error.code);
      throw error;
    }
  };
  //login user
  const login = async (email, password) => {
    try {
      setLoader(true);
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Login error:", error);
      setError(error.code);
      throw error;
    }
  };

  //logout user
  const logout = async () => {
    try {
      return await signOut(auth);
    } catch (error) {
      setError(error);
      throw error;
    }
  };

  //update user
  const updateUser = async (name, photo) => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });
      setUser(auth.currentUser);
    } catch (error) {
      setError(error);
      throw error;
    }
  };

  //using google signIn
  const googleProvider = new GoogleAuthProvider();
  const googleSignIn = async () => {
    try {
      setLoader(true);
      return await signInWithPopup(auth, googleProvider);
    } catch (error) {
      setError(error.code);
      throw error;
    }
  };

  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        localStorage.removeItem("token");
        setLoader(false);
        return;
      }

      setUser(user);

      const name = user.displayName || "Người dùng không tên"; // Default name

      axios
        .post("http://localhost:4000/api/set-token", {
          email: user.email,
          name: name,
        })
        .then((data) => {
          if (data.data.token) {
            localStorage.setItem("token", data.data.token);
            setIsAuthenticated(true); 
          }
          setLoader(false);
        })
        .catch((error) => {
          console.error("Error saving token:", error);
          setLoader(false);
        });
    });

    return () => unsubcribe();
  }, []);

  //contexxt
  const contextValue = {
    user,
    signUp,
    login,
    logout,
    updateProfile,
    googleSignIn,
    error,
    setError,
    loader,
    setLoader,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
