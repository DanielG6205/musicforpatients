'use client';

import { useEffect, useState } from "react";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth, provider } from "../firebase/firebaseConfig";

export default function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleClick = async () => {
    try {
      if (isLoggedIn) {
        await signOut(auth);
      } else {
        await signInWithPopup(auth, provider);
      }
    } catch (error) {
      console.error("Auth error:", error);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-blue-400 transition"
    >
      {isLoggedIn ? "Sign Out" : "Sign in with Google"}
    </button>
  );
}
