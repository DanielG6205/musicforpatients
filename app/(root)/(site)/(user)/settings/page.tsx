/* --------------------------------------------
   app/(dashboard)/settings/page.tsx  (example)
   -------------------------------------------- */
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db, storage } from '../../../../firebase/firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

type Profile = {
  fullName: string;
  birthDate: string;
  state: string;
  school: string;
  grade: string;
  instrument: string;
  yearsPlayed: string;
  mediaURL?: string;
  email?: string | null;
  photoURL?: string | null;
};

export default function SettingsPage() {
  /* ---------- auth / routing ---------- */
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  /* ---------- profile display ---------- */
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /* ---------- form state ---------- */
  const [formData, setFormData] = useState({
    fullName: '',
    birthDate: '',
    state: '',
    school: '',
    grade: '',
    instrument: '',
    yearsPlayed: '',
    videoURL: '',          // link option
  });
  const [videoFile, setVideoFile]   = useState<File | null>(null); // upload option
  const [uploading, setUploading]   = useState(false);
  const [uploadPct, setUploadPct]   = useState(0);

  /* ---------- load current user & profile ---------- */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        router.push('/');
        return;
      }
      setUser(firebaseUser);

      const docSnap = await getDoc(doc(db, 'users', firebaseUser.uid));
      if (docSnap.exists()) {
        const data = docSnap.data() as Profile;
        setProfile(data);
        setFormData({
          fullName: data.fullName ?? '',
          birthDate: data.birthDate ?? '',
          state: data.state ?? '',
          school: data.school ?? '',
          grade: data.grade ?? '',
          instrument: data.instrument ?? '',
          yearsPlayed: data.yearsPlayed ?? '',
          videoURL: data.mediaURL ?? '',
        });
      }
    });
    return () => unsubscribe();
  }, []);

  /* ---------- helpers ---------- */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!user) return;

    try {
      let mediaURL = formData.videoURL.trim(); // default to pasted link

      if (videoFile) {
        setUploading(true);
        const fileRef = ref(storage, `performances/${user.uid}/${videoFile.name}`);
        const task    = uploadBytesResumable(fileRef, videoFile);

        task.on('state_changed', snap =>
          setUploadPct((snap.bytesTransferred / snap.totalBytes) * 100)
        );

        await task;
        mediaURL = await getDownloadURL(fileRef);
        setUploading(false);
      }

      await setDoc(
        doc(db, 'users', user.uid),
        {
          fullName:    formData.fullName,
          birthDate:   formData.birthDate,
          state:       formData.state,
          school:      formData.school,
          grade:       formData.grade,
          instrument:  formData.instrument,
          yearsPlayed: formData.yearsPlayed,
          mediaURL,
          email:      user.email,
          photoURL:   user.photoURL,
          // admin flag left unchanged
        },
        { merge: true }
      );

      setProfile((prev) => prev ? { ...prev, ...formData, mediaURL } : null);
      setIsModalOpen(false);
      alert('Profile updated!');
    } catch (err) {
      console.error('Save error:', err);
      setUploading(false);
    }
  };

  /* ---------- early return ---------- */
  if (!profile) return <div className="p-8">Loading…</div>;

  return (
    <div className="p-8 max-w-2xl mx-auto min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

      <div className="space-y-4 bg-white shadow-md rounded-lg p-6">
        <div><strong>Full Name:</strong> {profile.fullName}</div>
        <div><strong>Birth Date:</strong> {profile.birthDate}</div>
        <div><strong>State:</strong> {profile.state}</div>
        <div><strong>School or College:</strong> {profile.school}</div>
        <div><strong>Grade:</strong> {profile.grade}</div>
        <div><strong>Instrument:</strong> {profile.instrument}</div>
        <div><strong>Years Played:</strong> {profile.yearsPlayed}</div>
        {profile.mediaURL && (
          <div>
            <strong>Performance:</strong>{' '}
            <a className="text-sky-600 underline" href={profile.mediaURL} target="_blank">
              View / Play
            </a>
          </div>
        )}

        <button
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setIsModalOpen(true)}
        >
          Edit
        </button>
      </div>

      {/* ------------------- Edit Modal ------------------- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

            {/* required fields */}
            {[
              { label: 'Full Name',        name: 'fullName',    type: 'text' },
              { label: 'Birth Date',       name: 'birthDate',   type: 'date' },
              { label: 'State',            name: 'state',       type: 'text' },
              { label: 'School / College', name: 'school',      type: 'text' },
              { label: 'Grade',            name: 'grade',       type: 'text' },
              { label: 'Instrument',       name: 'instrument',  type: 'text' },
              { label: 'Years Played',     name: 'yearsPlayed', type: 'number' },
            ].map(({ label, name, type }) => (
              <div className="mb-4" key={name}>
                <label className="block text-sm font-medium mb-1">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={formData[name as keyof typeof formData]}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
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
                <label className="block text-sm font-medium mb-1">Video Link</label>
                <input
                  type="url"
                  name="videoURL"
                  value={formData.videoURL}
                  onChange={handleChange}
                  placeholder="https://…"
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
            )}

            <div className="mt-6 flex justify-between">
              <button
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setIsModalOpen(false)}
                disabled={uploading}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={handleSave}
                disabled={uploading}
              >
                {uploading ? 'Saving…' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
