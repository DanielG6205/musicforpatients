'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

import { auth, provider, db, storage } from '../firebase/firebaseConfig';
import Image from 'next/image';
import Portal from './Portal';

/* ---------- component ---------- */
export default function Login() {
  /* -- auth + ui state -- */
  const [user, setUser]                 = useState<User | null>(null);
  const [hasMounted, setHasMounted]     = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSetupModal, setShowSetupModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router       = useRouter();

  /* -- profile form fields -- */
  const [fullName,     setFullName]     = useState('');
  const [birthDate,    setBirthDate]    = useState('');
  const [state,        setState]        = useState('');
  const [school,       setSchool]       = useState('');
  const [grade,        setGrade]        = useState('');
  const [instrument,   setInstrument]   = useState('');
  const [yearsPlayed,  setYearsPlayed]  = useState('');
  const [videoURL,     setVideoURL]     = useState('');            // link option
  const [videoFile,    setVideoFile]    = useState<File | null>(null); // upload option (.mp4)

  /* -- upload progress -- */
  const [uploading, setUploading] = useState(false);
  const [uploadPct, setUploadPct] = useState(0);

  /* ---------- lifecycle ---------- */
  useEffect(() => setHasMounted(true), []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      setUser(fbUser);

      if (fbUser) {
        try {
          const docSnap = await getDoc(doc(db, 'users', fbUser.uid));
          if (!docSnap.exists()) setShowSetupModal(true);
        } catch (err) {
          console.error('Error checking profile:', err);
        }
      } else {
        setShowSetupModal(false);
      }
    });
    return unsub;
  }, []);

  /* lock body scroll when modal open */
  useEffect(() => {
    document.body.style.overflow = showSetupModal ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showSetupModal]);

  /* close avatar dropdown when clicking outside */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* ---------- auth handlers ---------- */
  const handleAuthClick = async () => {
    try {
      if (user) {
        await signOut(auth);
        setUser(null);
      } else {
        await signInWithPopup(auth, provider);
      }
      setDropdownOpen(false);
    } catch (err) {
      console.error('Auth error:', err);
    }
  };

  /* ---------- profile save ---------- */
  const handleProfileSubmit = async () => {
    /* minimal validation */
    if (
      !fullName || !birthDate || !state || !school || !grade ||
      !instrument || !yearsPlayed || !user
    ) return;

    try {
      let mediaURL = videoURL.trim();  // may be empty

      /* if mp4 file provided, upload first */
      if (videoFile) {
        setUploading(true);

        const fileRef = ref(storage, `performances/${user.uid}/${videoFile.name}`);
        const task    = uploadBytesResumable(fileRef, videoFile);

        task.on('state_changed', snap => {
          setUploadPct((snap.bytesTransferred / snap.totalBytes) * 100);
        });

        await task;                             // wait for finish
        mediaURL  = await getDownloadURL(fileRef);
        setUploading(false);
      }

      /* write Firestore doc */
      await setDoc(doc(db, 'users', user.uid), {
        fullName, birthDate, state, school, grade,
        instrument, yearsPlayed,
        mediaURL,                // link OR uploaded mp4 URL (may be '')
        email: user.email,
        photoURL: user.photoURL,
        admin: false,            // hidden role
      });

      setShowSetupModal(false);
    } catch (err) {
      console.error('Error saving profile:', err);
      setUploading(false);
    }
  };

  /* ---------- ui pieces ---------- */
  const AvatarDropdown = () => (
    <div className="relative inline-block" ref={dropdownRef}>
      <button onClick={() => setDropdownOpen(!dropdownOpen)}>
        <Image
          src={user?.photoURL || '/default.png'}
          alt="Profile"
          width={48}
          height={48}
          className="rounded-full cursor-pointer"
        />
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md text-black z-50">
          <button
            className="block w-full text-left p-2 hover:bg-gray-100"
            onClick={() => { router.push('/settings'); setDropdownOpen(false); }}
          >
            Edit Settings
          </button>
          <button
            className="block w-full text-left p-2 hover:bg-gray-100"
            onClick={handleAuthClick}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );

  const SetupModal = () => (
    <Portal>
      <div className="fixed inset-0 bg-[#cbc3e3] flex items-center justify-center z-[1000]">
        <div className="bg-white w-full max-w-md max-h-[90vh] overflow-y-auto p-6 rounded-lg shadow-xl">
          <h2 className="text-xl font-bold mb-4">Complete Your Profile</h2>

          {/* --- required fields --- */}
          {[
            { label: 'Full Name',        val: fullName,    set: setFullName },
            { label: 'Birth Date',       val: birthDate,   set: setBirthDate,  type: 'date' },
            { label: 'State',            val: state,       set: setState },
            { label: 'School / College', val: school,      set: setSchool },
            { label: 'Grade',            val: grade,       set: setGrade },
            { label: 'Instrument',       val: instrument,  set: setInstrument },
            { label: 'Years Played',     val: yearsPlayed, set: setYearsPlayed },
          ].map(({ label, val, set, type = 'text' }, idx) => (
            <div className="mb-4" key={idx}>
              <label className="block mb-1 text-sm font-medium">{label}</label>
              <input
                type={type}
                value={val}
                onChange={(e) => set(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          ))}

          {/* --- link vs upload choice --- */}
          <div className="mb-4 flex gap-4">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="media-choice"
                checked={!videoFile}
                onChange={() => setVideoFile(null)}
              />
              Paste Link
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="media-choice"
                checked={!!videoFile}
                onChange={() => setVideoURL('')}
              />
              Upload MP4
            </label>
          </div>

          {/* conditional input */}
          {videoFile ? (
            <div className="mb-4">
              <input
                type="file"
                accept="video/mp4"
                onChange={(e) => setVideoFile(e.target.files?.[0] ?? null)}
                className="w-full"
              />
              {uploading && (
                <p className="mt-2 text-sm text-gray-600">
                  Uploading … {uploadPct.toFixed(0)}%
                </p>
              )}
            </div>
          ) : (
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium">Video / Audio Link</label>
              <input
                type="url"
                value={videoURL}
                onChange={(e) => setVideoURL(e.target.value)}
                placeholder="https://…"
                className="w-full border rounded px-3 py-2"
              />
            </div>
          )}

          <button
            onClick={handleProfileSubmit}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
            disabled={uploading}
          >
            {uploading ? 'Saving…' : 'Save & Continue'}
          </button>
        </div>
      </div>
    </Portal>
  );

  /* ---------- render ---------- */
  if (!hasMounted) return null;

  return (
    <>
      {showSetupModal && <SetupModal />}

      {!user ? (
        <button
          onClick={handleAuthClick}
          className="bg-purple-500 hover:bg-blue-400 text-white px-6 py-3 rounded-lg transition"
        >
          Sign in with Google
        </button>
      ) : (
        <AvatarDropdown />
      )}
    </>
  );
}
