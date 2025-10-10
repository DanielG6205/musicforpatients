'use client';

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import Header from "../components/Header";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  const [, setHeaderHeight] = useState(320); // fallback spacing
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const headerEl = document.querySelector("header");
    if (headerEl) {
      setHeaderHeight(headerEl.offsetHeight);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      {/* Header */}
      <Header />
      <div style={{ height: `120px` }} className="bg-purple-900"/>

      {/* Hero Section with GIF Background */}
      <section className="relative w-full h-screen bg-black text-white flex items-center justify-center overflow-hidden">
        <Image
          src="/hero.gif"
          alt="Animated Music Healing"
          fill
          className="object-cover opacity-70"
          priority
        />
        <div className="relative z-10 text-center p-8 max-w-3xl" data-aos="fade-up">
          {user && (
            <p className="text-lg mb-2">Welcome, {user.displayName}</p>
          )}
          <h1 className="text-6xl font-bold mb-2">Music For Patients</h1>
          <p className="text-xl mb-6">
            At Music For Patients, we believe music can make a profound impact on the lives of hospitalized individuals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.href = "https://hcb.hackclub.com/donations/start/music-for-patients"}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Donate
            </button>
            <button
              onClick={() => window.location.href = "/volunteer"}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
            >
              Volunteer
            </button>
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="flex flex-col sm:flex-row gap-8 items-center justify-center py-10 bg-purple-900" data-aos="fade-up">
        <Image
          src="/front/DSC_0321.JPG"
          alt="Music in hospital"
          width={400}
          height={300}
          className="rounded-lg shadow-lg"
        />
        <Image
          src="/front/DSC_0258.JPG"
          alt="Cellist playing for patient"
          width={400}
          height={300}
          className="rounded-lg shadow-lg"
        />
      </section>

      {/* Quote Section */}
      <section className="text-center px-4 py-10 bg-purple-900" data-aos="fade-up">
        <p className="text-lg max-w-2xl mx-auto italic text-white mb-4">
          &quot;Join us in our mission to bring the healing power of music to those who need it most.&quot; - Music For Patients Team
        </p>
      </section>

      {/* Cards Section */}
      <section
        className="flex flex-col sm:flex-row justify-center items-center gap-10 py-20 px-4 bg-black"
        data-aos="fade-up"
      >
        {/* Testimonies Card */}
        <div
          className="w-full sm:w-1/2 max-w-sm bg-gray-900 shadow-lg rounded-2xl overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 border border-gray-800"
          data-aos="fade-right"
        >
          <Link href="/testimonies" className="block group">
            <div className="overflow-hidden">
              <Image
                src="/front/DSC_0295.JPG"
                alt="Testimonies"
                width={400}
                height={300}
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 text-center">
              <h2 className="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors duration-300">
                Testimonies
              </h2>
              <p className="text-gray-400 mt-3 text-sm">
                Hear inspiring stories and life-changing experiences from our community.
              </p>
            </div>
          </Link>
        </div>
              
        {/* Events Card */}
        <div
          className="w-full sm:w-1/2 max-w-sm bg-gray-900 shadow-lg rounded-2xl overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 border border-gray-800"
          data-aos="fade-left"
        >
          <Link href="/events" className="block group">
            <div className="overflow-hidden">
              <Image
                src="/front/DSC_0239.JPG"
                alt="Events"
                width={400}
                height={300}
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 text-center">
              <h2 className="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors duration-300">
                Events
              </h2>
              <p className="text-gray-400 mt-3 text-sm">
                Explore our past and upcoming events — join us and make memories together.
              </p>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}
