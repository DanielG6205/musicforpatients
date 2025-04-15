"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import throttle from "lodash/throttle";

const Header = () => {
  const [scrollY, setScrollY] = useState(0);
  // Set a threshold at which the big logo is considered hidden
  const fadeThreshold = 100;

  useEffect(() => {
    const handleScroll = throttle(() => {
      setScrollY(window.scrollY);
    }, 50);
    window.addEventListener("scroll", handleScroll);
    return () => {
      handleScroll.cancel();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // While scrolling between 0 and fadeThreshold, we'll gradually fade and shrink the big logo.
  // You can adjust these calculations to achieve your desired fade effect.
  const computedOpacity =
    scrollY < fadeThreshold ? 1 - scrollY / fadeThreshold : 0;
  const computedHeight =
    scrollY < fadeThreshold ? `${256 * (1 - scrollY / fadeThreshold)}px` : "0px";

  // Flag to check if the big logo is still showing
  const isBigLogoVisible = scrollY < fadeThreshold;

  return (
    <>
      <header className="w-full bg-black transition-all duration-300 ease-out">
        {/* Big logo container rendered above the navbar */}
        <div
          className="overflow-hidden transition-all duration-300 ease-out"
          style={{
            opacity: computedOpacity,
            height: computedHeight,
          }}
        >
          <div className="flex justify-center items-center h-full">
            <Image
              src="/vercel.svg" // Replace with your big logo image
              alt="Big Logo"
              width={400}
              height={300}
            />
          </div>
        </div>

        {/* Navbar section */}
        {isBigLogoVisible ? (
          // When the big logo is visible, the navbar remains in flow (below the logo)
          <nav className="px-5 py-3 shadow-sm font-work-sans bg-black transition-all duration-300 ease-out">
            <div className="flex items-center">
              <Link href="/">
                <Image
                  src="/vercel.svg" // Optionally use a default logo when the big logo is visible
                  alt="Logo"
                  width={50}
                  height={50}
                />
              </Link>
              <div className="flex-1 flex justify-center items-center gap-20 text-lg">
                <Link href="/" className="text-white hover:text-gray-200">
                  Home
                </Link>
                <Link href="/mission" className="text-white hover:text-gray-200">
                  Our Mission
                </Link>
                <Link href="/team" className="text-white hover:text-gray-200">
                  Meet Our Team
                </Link>
                <Link href="/gallery" className="text-white hover:text-gray-200">
                  Gallery
                </Link>
                <Link href="/testimonies" className="text-white hover:text-gray-200">
                  Testimonies
                </Link>
                <Link href="/contact" className="text-white hover:text-gray-200">
                  Contact Us
                </Link>
              </div>
            </div>
          </nav>
        ) : (
          // When the big logo is hidden, the navbar becomes fixed at the top
          <>
            <nav
              className="fixed top-0 left-0 w-full z-50 px-5 py-3 shadow-sm font-work-sans bg-black transition-all duration-300 ease-out"
            >
              <div className="flex items-center">
                <Link href="/">
                  <Image
                    src="/mini-logo.svg" // Optionally switch to a mini logo when fixed
                    alt="Mini Logo"
                    width={50}
                    height={50}
                  />
                </Link>
                <div className="flex-1 flex justify-center items-center gap-20 text-lg">
                  <Link href="/" className="text-white hover:text-gray-200">
                    Home
                  </Link>
                  <Link href="/mission" className="text-white hover:text-gray-200">
                    Our Mission
                  </Link>
                  <Link href="/team" className="text-white hover:text-gray-200">
                    Meet Our Team
                  </Link>
                  <Link href="/gallery" className="text-white hover:text-gray-200">
                    Gallery
                  </Link>
                  <Link href="/testimonies" className="text-white hover:text-gray-200">
                    Testimonies
                  </Link>
                  <Link href="/contact" className="text-white hover:text-gray-200">
                    Contact Us
                  </Link>
                </div>
              </div>
            </nav>
            {/* Spacer to prevent content from jumping under the fixed navbar */}
            <div className="mt-16"></div>
          </>
        )}
      </header>
    </>
  );
};

export default Header;
