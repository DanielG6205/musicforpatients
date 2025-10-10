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

/* ---------- profile form type ---------- */
type ProfileForm = {
  fullName: string;
  birthDate: string;
  state: string;
  school: string;
  grade: string;
  instrument: string;
  yearsPlayed: string;
  videoURL: string;
};

export default function Login() {
  const [user, setUser] = useState<User | null>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSetupModal, setShowSetupModal] = useState(false);

  const [formData, setFormData] = useState<ProfileForm>({
    fullName: '',
    birthDate: '',
    state: '',
    school: '',
    grade: '',
    instrument: '',
    yearsPlayed: '',
    videoURL: '',
  });
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadPct, setUploadPct] = useState(0);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  /* ---------- lifecycle ---------- */
  useEffect(() => setHasMounted(true), []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      setUser(fbUser);

      if (fbUser) {
        try {
          const docSnap = await getDoc(doc(db, 'users', fbUser.uid));
          if (!docSnap.exists()) {
            // no profile yet → force modal
            setShowSetupModal(true);
          }
        } catch (err) {
          console.error('Error checking profile:', err);
        }
      } else {
        setShowSetupModal(false);
      }
    });
    return unsub;
  }, []);

  /* close dropdown when clicking outside */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* ---------- helpers ---------- */
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = async () => {
    if (
      !formData.fullName ||
      !formData.birthDate ||
      !formData.state ||
      !formData.school ||
      !formData.grade ||
      !formData.instrument ||
      !formData.yearsPlayed ||
      !user
    ) {
      alert('Please fill all required fields.');
      return;
    }

    try {
      let mediaURL = formData.videoURL.trim();

      if (videoFile) {
        setUploading(true);
        const fileRef = ref(storage, `performances/${user.uid}/${videoFile.name}`);
        const task = uploadBytesResumable(fileRef, videoFile);

        task.on('state_changed', (snap) => {
          setUploadPct((snap.bytesTransferred / snap.totalBytes) * 100);
        });

        await task;
        mediaURL = await getDownloadURL(fileRef);
        setUploading(false);
      }

      await setDoc(
        doc(db, 'users', user.uid),
        {
          ...formData,
          mediaURL,
          email: user.email,
          photoURL: user.photoURL,
          admin: false,
        },
        { merge: true }
      );

      setShowSetupModal(false);
      alert('Profile created!');
    } catch (err) {
      console.error('Error saving profile:', err);
      setUploading(false);
    }
  };

  /* ---------- UI ---------- */
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
            onClick={() => {
              router.push('/settings');
              setDropdownOpen(false);
            }}
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
    <div className="fixed inset-0 bg-black/50 flex justify-center items-start pt-[100px] z-50">
      <div className="bg-white w-full max-w-md max-h-[90vh] overflow-y-auto p-6 rounded-lg shadow-xl">
        <h2 className="text-xl font-bold mb-4">Complete Your Profile</h2>

        {/* required fields */}
        {[
          { label: 'Full Name', name: 'fullName', type: 'text' },
          { label: 'Birth Date', name: 'birthDate', type: 'date' },
          { label: 'State', name: 'state', type: 'text' },
          { label: 'School / College', name: 'school', type: 'text' },
          { label: 'Grade', name: 'grade', type: 'text' },
          { label: 'Instrument', name: 'instrument', type: 'text' },
          { label: 'Years Played', name: 'yearsPlayed', type: 'number' },
        ].map(({ label, name, type }) => (
          <div className="mb-4" key={name}>
            <label className="block mb-1 text-sm font-medium">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name as keyof typeof formData]}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
        ))}

        {/* link vs mp4 upload */}
        <div className="mb-4 flex gap-4">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="mediaChoice"
              checked={!videoFile}
              onChange={() => setVideoFile(null)}
            />
            Paste Link
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="mediaChoice"
              checked={!!videoFile}
              onChange={() => setFormData((f) => ({ ...f, videoURL: '' }))}
            />
            Upload MP4
          </label>
        </div>

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
                Uploading… {uploadPct.toFixed(0)}%
              </p>
            )}
          </div>
        ) : (
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Video / Audio Link</label>
            <input
              type="url"
              name="videoURL"
              value={formData.videoURL}
              onChange={handleChange}
              placeholder="https://…"
              className="w-full border rounded px-3 py-2"
            />
          </div>
        )}

        <button
          onClick={handleProfileSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          disabled={uploading}
        >
          {uploading ? 'Saving…' : 'Save & Continue'}
        </button>
      </div>
    </div>
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
