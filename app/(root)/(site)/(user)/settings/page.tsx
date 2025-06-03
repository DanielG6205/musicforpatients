'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '../../../../firebase/firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

type Profile = {
  fullName: string;
  birthDate: string;
  state: string;
  school: string;
  instrument: string;
  yearsPlayed: string;
  email?: string | null;
  photoURL?: string | null;
};

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    birthDate: '',
    state: '',
    school: '',
    instrument: '',
    yearsPlayed: '',
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          const profileData: Profile = {
            fullName: data.fullName || '',
            birthDate: data.birthDate || '',
            state: data.state || '',
            school: data.school || '',
            instrument: data.instrument || '',
            yearsPlayed: data.yearsPlayed || '',
            email: data.email || null,
            photoURL: data.photoURL || null,
          };
          setProfile(profileData);
          setFormData({
            fullName: profileData.fullName,
            birthDate: profileData.birthDate,
            state: profileData.state,
            school: profileData.school,
            instrument: profileData.instrument,
            yearsPlayed: profileData.yearsPlayed,
          });
        }
      } else {
        router.push('/');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleEditClick = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const handleSave = async () => {
    if (!user) return;
    await setDoc(doc(db, 'users', user.uid), {
      ...formData,
      email: user.email,
      photoURL: user.photoURL,
    });
    setProfile(formData);
    setIsModalOpen(false);
    alert('Profile updated!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!profile) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8 max-w-2xl mx-auto min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

      <div className="space-y-4 bg-white shadow-md rounded-lg p-6">
        <div><strong>Full Name:</strong> {profile.fullName}</div>
        <div><strong>Birth Date:</strong> {profile.birthDate}</div>
        <div><strong>State:</strong> {profile.state}</div>
        <div><strong>School or College:</strong> {profile.school}</div>
        <div><strong>Instrument:</strong> {profile.instrument}</div>
        <div><strong>Years Played:</strong> {profile.yearsPlayed}</div>

        <button
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleEditClick}
        >
          Edit
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

            {[
              { label: 'Full Name', name: 'fullName', type: 'text' },
              { label: 'Birth Date', name: 'birthDate', type: 'date' },
              { label: 'State', name: 'state', type: 'text' },
              { label: 'School or College', name: 'school', type: 'text' },
              { label: 'Instrument', name: 'instrument', type: 'text' },
              { label: 'Years Played', name: 'yearsPlayed', type: 'number' },
            ].map(({ label, name, type }, i) => (
              <div className="mb-4" key={i}>
                <label className="block text-sm font-medium mb-1">{label}</label>
                <input
                  type={type}
                  name={name}
                  className="w-full border px-3 py-2 rounded"
                  value={formData[name as keyof typeof formData]}
                  onChange={handleChange}
                />
              </div>
            ))}

            <div className="flex justify-between mt-6">
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
