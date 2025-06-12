'use client';

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import throttle from "lodash/throttle";
import Login from "./Login";

const Header = () => {
  const fadeThreshold = 100;
  const logoMaxHeight = 256;
  const headerRef = useRef<HTMLDivElement>(null);

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
    <header ref={headerRef} className="w-full bg-cream">
      {/* Shrinking Logo */}
      <div
        className="flex justify-center items-center overflow-hidden transition-all duration-300 ease-out"
        style={{ height: logoH, opacity: logoOpac }}
      >
        <Image src="/big-logo.png" alt="Big Logo" width={300} height={200} />
      </div>

      {/* Navbar */}
      <nav
        className="fixed top-0 left-0 w-full z-50 px-5 py-3 shadow-sm font-work-sans bg-black/80 backdrop-blur-sm transition-all duration-300 ease-out"
        style={{ top: `${logoH}px` }}
      >
        <div className="flex items-center justify-between w-full relative">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Link href="/">
              <Image src="/small-logo.png" alt="Logo" width={50} height={50} />
            </Link>
          </div>

          {/* Center Nav */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-10 text-white text-lg items-center">
            <Link href="/" className="px-4 py-2 rounded hover:bg-gray-800">Home</Link>

            {/* About Menu */}
            <div
              className="relative group"
              onMouseEnter={() => setHoveredMenu("about")}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <div className={`px-4 py-2 rounded ${hoveredMenu === "about" ? "bg-gray-800" : ""}`}>
                About
              </div>
              <div className={`absolute left-0 top-full bg-white text-black rounded shadow-md w-48 p-2 z-50 ${hoveredMenu === "about" ? "block" : "hidden"}`}>
                <Link href="/about" className="block px-4 py-2 hover:bg-gray-100">Our Mission</Link>
                <Link href="/team" className="block px-4 py-2 hover:bg-gray-100">Our Team</Link>
                <Link href="/partners" className="block px-4 py-2 hover:bg-gray-100">Our Partners</Link>
              </div>
            </div>

            {/* Media Menu */}
            <div
              className="relative group"
              onMouseEnter={() => setHoveredMenu("media")}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <div className={`px-4 py-2 rounded ${hoveredMenu === "media" ? "bg-gray-800" : ""}`}>
                Media
              </div>
              <div className={`absolute left-0 top-full bg-white text-black rounded shadow-md w-48 p-2 z-50 ${hoveredMenu === "media" ? "block" : "hidden"}`}>
                <Link href="/gallery" className="block px-4 py-2 hover:bg-gray-100">Gallery</Link>
                <Link href="/testimonies" className="block px-4 py-2 hover:bg-gray-100">Testimonies</Link>
              </div>
            </div>

            {/* Donate Menu */}
            <div
              className="relative group"
              onMouseEnter={() => setHoveredMenu("donate")}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <div className={`px-4 py-2 rounded ${hoveredMenu === "donate" ? "bg-gray-800" : ""}`}>
                Help Us
              </div>
              <div className={`absolute left-0 top-full bg-white text-black rounded shadow-md w-48 p-2 z-50 ${hoveredMenu === "donate" ? "block" : "hidden"}`}>
                <Link href="/events" className="block px-4 py-2 hover:bg-gray-100">Events</Link>
                <a href="https://hcb.hackclub.com/donations/start/music-for-patients" target="_blank" rel="noopener noreferrer"className="block px-4 py-2 hover:bg-gray-100">
                  Donate
                </a>
                <Link href="/volunteer" className="block px-4 py-2 hover:bg-gray-100">Volunteer</Link>
              </div>
            </div>

            <Link href="/contact" className="px-4 py-2 rounded hover:bg-gray-800">Contact Us</Link>
          </div>

          {/* Right: Login Button */}
          <div className="flex items-center">
            <Login />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
