'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function NavBar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 h-16 bg-black px-6 py-3 shadow-sm">
        <div className="flex items-center h-full">
          {/* Mini logo on the left */}
          <Link href="/">
            <Image src="/small-logo.png" alt="Music For Patients" width={40} height={40} />
          </Link>

          {/* Navigation */}
          <div className="flex-1 flex justify-center gap-10 text-white text-base relative">
            {/* Home */}
            <Link
              href="/"
              className="px-4 py-2 rounded hover:bg-gray-800 hover:text-gray-200"
            >
              Home
            </Link>

            {/* About Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setOpenMenu("about")}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <div className={`px-4 py-2 rounded ${openMenu === "about" ? "bg-gray-800" : ""}`}>
                About
              </div>
              <div
                className={`absolute top-full bg-white text-black rounded shadow-md w-48 p-2 z-50 ${
                  openMenu === "about" ? "block" : "hidden"
                }`}
              >
                <Link href="/about" className="block px-4 py-2 hover:bg-gray-100">Our Mission</Link>
                <Link href="/team" className="block px-4 py-2 hover:bg-gray-100">Our Team</Link>
                <Link href="/partners" className="block px-4 py-2 hover:bg-gray-100">Our Partners</Link>
              </div>
            </div>

            {/* Media Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setOpenMenu("media")}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <div className={`px-4 py-2 rounded ${openMenu === "media" ? "bg-gray-800" : ""}`}>
                Media
              </div>
              <div
                className={`absolute top-full bg-white text-black rounded shadow-md w-48 p-2 z-50 ${
                  openMenu === "media" ? "block" : "hidden"
                }`}
              >
                <Link href="/gallery" className="block px-4 py-2 hover:bg-gray-100">Gallery</Link>
                <Link href="/testimonies" className="block px-4 py-2 hover:bg-gray-100">Testimonies</Link>
              </div>
            </div>

            {/* Donate Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setOpenMenu("donate")}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <div className={`px-4 py-2 rounded ${openMenu === "donate" ? "bg-gray-800" : ""}`}>
                Help Us
              </div>
              <div
                className={`absolute top-full bg-white text-black rounded shadow-md w-48 p-2 z-50 ${
                  openMenu === "donate" ? "block" : "hidden"
                }`}
              >
                <Link href="/events" className="block px-4 py-2 hover:bg-gray-100">Events</Link>
                <Link href="/donate" className="block px-4 py-2 hover:bg-gray-100">Donate</Link>
                <Link href="/volunteer" className="block px-4 py-2 hover:bg-gray-100">Volunteer</Link>
              </div>
            </div>

            {/* Contact Us */}
            <Link
              href="/contact"
              className="px-4 py-2 rounded hover:bg-gray-800 hover:text-gray-200"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </nav>

      {/* Spacer to avoid overlap with fixed navbar */}
      <div className="h-16" />
    </>
  );
}
