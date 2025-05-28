'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import throttle from "lodash/throttle";

const Header = () => {
  const fadeThreshold = 100;
  const logoMaxHeight = 256;

  const [scrollY, setScrollY] = useState(0);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = throttle(() => setScrollY(window.scrollY), 50);
    window.addEventListener("scroll", handleScroll);
    return () => {
      handleScroll.cancel();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const progress = Math.min(scrollY / fadeThreshold, 1);
  const logoH = logoMaxHeight * (1 - progress);
  const logoOpac = 1 - progress;

  return (
    <header className="w-full bg-cream">
      {/* Shrinking Logo */}
      <div
        className="flex justify-center items-center overflow-hidden transition-all duration-300 ease-out"
        style={{ height: logoH, opacity: logoOpac}}
      >
        <Image src="/big-logo.png" alt="Big Logo" width={300} height={200} />
      </div>

      {/* Navbar */}
      <nav
        className="fixed left-0 w-full z-50 px-5 py-3 shadow-sm font-work-sans bg-black transition-all duration-300 ease-out"
        style={{ top: `${logoH}px` }}
      >
        <div className="flex items-center">
          {/* Mini logo */}
          <Link href="/">
            <Image src="/small-logo.png" alt="Logo" width={50} height={50} />
          </Link>
          
          
          {/* Navigation Links with Full Hover Area */}
          <div className="flex-1 flex justify-center items-center gap-10 text-white text-lg relative">
            <Link
              href="/"
              className="px-4 py-2 rounded hover:bg-gray-800 hover:text-gray-200"
            >
              Home
            </Link>
            {/* MENU GROUP: ABOUT */}
            <div
              className="relative group"
              onMouseEnter={() => setHoveredMenu("about")}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <div className={`px-4 py-2 rounded ${hoveredMenu === "about" ? "bg-gray-800" : ""}`}>
                About
              </div>
              <div
                className={`absolute left-0 top-full bg-white text-black rounded shadow-md w-48 p-2 z-50 ${
                  hoveredMenu === "about" ? "block" : "hidden"
                }`}
              >
                <Link href="/about" className="block px-4 py-2 hover:bg-gray-100">Our Mission</Link>
                <Link href="/team" className="block px-4 py-2 hover:bg-gray-100">Our Team</Link>
                <Link href="/partners" className="block px-4 py-2 hover:bg-gray-100">Our Partners</Link>
              </div>
            </div>

            {/* MENU GROUP: MEDIA */}
            <div
              className="relative group"
              onMouseEnter={() => setHoveredMenu("media")}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <div className={`px-4 py-2 rounded ${hoveredMenu === "media" ? "bg-gray-800" : ""}`}>
                Media
              </div>
              <div
                className={`absolute left-0 top-full bg-white text-black rounded shadow-md w-48 p-2 z-50 ${
                  hoveredMenu === "media" ? "block" : "hidden"
                }`}
              >
                <Link href="/gallery" className="block px-4 py-2 hover:bg-gray-100">Gallery</Link>
                <Link href="/testimonies" className="block px-4 py-2 hover:bg-gray-100">Testimonies</Link>
              </div>
            </div>

            {/* MENU GROUP: DONATE */}
            <div
              className="relative group"
              onMouseEnter={() => setHoveredMenu("donate")}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <div className={`px-4 py-2 rounded ${hoveredMenu === "donate" ? "bg-gray-800" : ""}`}>
                Help Us
              </div>
              <div
                className={`absolute left-0 top-full bg-white text-black rounded shadow-md w-48 p-2 z-50 ${
                  hoveredMenu === "donate" ? "block" : "hidden"
                }`}
              >
                <Link href="/events" className="block px-4 py-2 hover:bg-gray-100">Events</Link>
                <Link href="/donate" className="block px-4 py-2 hover:bg-gray-100">Donate</Link>
                <Link href="/volunteer" className="block px-4 py-2 hover:bg-gray-100">Volunteer</Link>
              </div>
            </div>

            {/* CONTACT US */}
            <Link href="/contact" className="hover:text-gray-200 px-4 py-2 rounded hover:bg-gray-800">
              Contact Us
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
