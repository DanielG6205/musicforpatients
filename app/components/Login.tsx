'use client';

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, provider, db } from "../firebase/firebaseConfig";
import Image from "next/image";
import Portal from "./Portal";

export default function Login() {
  const [user, setUser] = useState<User | null>(null);
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Form fields
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [state, setState] = useState('');
  const [school, setSchool] = useState('');
  const [instrument, setInstrument] = useState('');
  const [yearsPlayed, setYearsPlayed] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          if (!userDoc.exists()) {
            setShowSetupModal(true);
          }
        } catch (error) {
          console.error("Error loading user profile:", error);
        }
      } else {
        setShowSetupModal(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // Scroll lock when modal is open
  useEffect(() => {
    if (showSetupModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showSetupModal]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAuthClick = async () => {
    try {
      if (user) {
        await signOut(auth);
        setUser(null);
        setDropdownOpen(false);
      } else {
        await signInWithPopup(auth, provider);
      }
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  const handleProfileSubmit = async () => {
    if (!fullName || !birthDate || !state || !school || !instrument || !yearsPlayed || !user) return;
    try {
      await setDoc(doc(db, "users", user.uid), {
        fullName,
        birthDate,
        state,
        school,
        instrument,
        yearsPlayed,
        email: user.email,
        photoURL: user.photoURL,
      });
      setShowSetupModal(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const renderDropdown = () => (
    <div className="relative inline-block" ref={dropdownRef}>
      <button onClick={() => setDropdownOpen(!dropdownOpen)}>
        <Image
          src={user?.photoURL || "/default.png"}
          alt="Profile"
          width={48}
          height={48}
          className="rounded-full cursor-pointer"
        />
      </button>
      {dropdownOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white border rounded shadow-md w-40 text-black z-50">
          <button
            className="block w-full text-left hover:bg-gray-100 p-2"
            onClick={() => {
              router.push("/settings");
              setDropdownOpen(false);
            }}
          >
            Edit Settings
          </button>
          <button
            className="block w-full text-left hover:bg-gray-100 p-2"
            onClick={handleAuthClick}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );


const renderSetupModal = () => (
  <Portal>
  <div className="fixed inset-0 bg-[#cbc3e3] flex justify-center items-center z-[1000]">
    <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto shadow-xl">
      <h2 className="text-xl font-bold mb-4">Complete Your Profile</h2>

      {[
        { label: "Full Name", value: fullName, onChange: setFullName },
        { label: "Birth Date", value: birthDate, onChange: setBirthDate, type: "date" },
        { label: "State", value: state, onChange: setState },
        { label: "School or College", value: school, onChange: setSchool },
        { label: "Instrument", value: instrument, onChange: setInstrument },
        { label: "Years Played", value: yearsPlayed, onChange: setYearsPlayed },
      ].map(({ label, value, onChange, type = "text" }, i) => (
        <div className="mb-4" key={i}>
          <label className="block text-sm font-medium mb-1">{label}</label>
          <input
            type={type}
            className="w-full border px-3 py-2 rounded"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      ))}

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
        onClick={handleProfileSubmit}
      >
        Save & Continue
      </button>
    </div>
  </div>
</Portal>

);


  if (!hasMounted) return null;

  return (
    <>
      {showSetupModal && renderSetupModal()}
      {!user ? (
        <button
          onClick={handleAuthClick}
          className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-blue-400 transition"
        >
          Sign in with Google
        </button>
      ) : (
        renderDropdown()
      )}
    </>
  );
}
