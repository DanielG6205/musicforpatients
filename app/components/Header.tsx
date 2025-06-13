'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import throttle from 'lodash/throttle';
import Login from './Login';

const Header = () => {
  /* ----------------- constants & state ----------------- */
  const fadeThreshold   = 100;   // px scrolled before logo gone
  const logoMaxHeight   = 256;

  const [scrollY,       setScrollY]      = useState(0);
  const [openDesktop,   setOpenDesktop]  = useState<string | null>(null); // desktop hover / click
  const [mobileOpen,    setMobileOpen]   = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);

  /* ----------------- shrink-on-scroll ------------------- */
  useEffect(() => {
    const handleScroll = throttle(() => setScrollY(window.scrollY), 50);
    window.addEventListener('scroll', handleScroll);
    return () => {
      handleScroll.cancel();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const logoH    = logoMaxHeight * (1 - Math.min(scrollY / fadeThreshold, 1));
  const logoOpacity = 1 - Math.min(scrollY / fadeThreshold, 1);

  /* ----------------- helpers ---------------------------- */
  const closeMobile = () => {
    setMobileOpen(false);
    setMobileSection(null);
  };

  /* ====================================================== */
  return (
    <header className="w-full bg-cream">
      {/* shrinking hero logo */}
      <div
        className="flex justify-center items-center overflow-hidden transition-all duration-300 ease-out"
        style={{ height: logoH, opacity: logoOpacity }}
      >
        <Image src="/big-logo.png" alt="Big logo" width={300} height={200} priority />
      </div>

      {/* navbar */}
      <nav
        className="fixed left-0 w-full z-50 px-5 py-3 shadow-sm font-work-sans bg-black/80 backdrop-blur-sm transition-all duration-300 ease-out"
        style={{ top: `${logoH}px` }}
      >
        <div className="flex items-center justify-between relative">
          {/* site logo */}
          <Link href="/" className="flex-shrink-0">
            <Image src="/small-logo.png" alt="Logo" width={50} height={50} priority />
          </Link>

          {/* hamburger ( ≤ md ) */}
          <button
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(o => !o)}
            className="md:hidden p-2 focus:outline-none"
          >
            <svg className="w-6 h-6 stroke-white" fill="none" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* -------------- DESKTOP NAV -------------- */}
          <div
            className="
              hidden md:flex gap-10 text-white text-lg items-center
              md:absolute md:left-1/2 md:-translate-x-1/2
            "
          >
            <Link href="/" className="px-4 py-2 rounded hover:bg-gray-800">Home</Link>

            {/* About */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDesktop('about')}
              onMouseLeave={() => setOpenDesktop(null)}
            >
              <Link
                href="/about"
                className="px-4 py-2 rounded hover:bg-gray-800"
                onClick={() => setOpenDesktop(null)} // close on nav
              >
                About
              </Link>
              <div
                className={`
                  absolute left-0 top-full bg-white text-black rounded shadow-md w-52 p-2 z-50
                  ${openDesktop === 'about' ? 'block' : 'hidden'}
                `}
              >
                <Link href="/about"     className="block px-4 py-2 hover:bg-gray-100">About Us</Link>
                <Link href="/team"      className="block px-4 py-2 hover:bg-gray-100">Our Team</Link>
                <Link href="/partners"  className="block px-4 py-2 hover:bg-gray-100">Our Partners</Link>
              </div>
            </div>

            {/* Media */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDesktop('media')}
              onMouseLeave={() => setOpenDesktop(null)}
            >
              <Link
                href="/media"
                className="px-4 py-2 rounded hover:bg-gray-800"
                onClick={() => setOpenDesktop(null)}
              >
                Media
              </Link>
              <div
                className={`
                  absolute left-0 top-full bg-white text-black rounded shadow-md w-48 p-2 z-50
                  ${openDesktop === 'media' ? 'block' : 'hidden'}
                `}
              >
                <Link href="/gallery"    className="block px-4 py-2 hover:bg-gray-100">Gallery</Link>
                <Link href="/testimonies"className="block px-4 py-2 hover:bg-gray-100">Testimonies</Link>
              </div>
            </div>

            {/* Help Us */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDesktop('help')}
              onMouseLeave={() => setOpenDesktop(null)}
            >
              <Link
                href="/help"
                className="px-4 py-2 rounded hover:bg-gray-800"
                onClick={() => setOpenDesktop(null)}
              >
                Help&nbsp;Us
              </Link>
              <div
                className={`
                  absolute left-0 top-full bg-white text-black rounded shadow-md w-48 p-2 z-50
                  ${openDesktop === 'help' ? 'block' : 'hidden'}
                `}
              >
                <Link href="/events"   className="block px-4 py-2 hover:bg-gray-100">Events</Link>
                <Link href="/volunteer"className="block px-4 py-2 hover:bg-gray-100">Volunteer</Link>
                <a
                  href="https://hcb.hackclub.com/donations/start/music-for-patients"
                  target="_blank" rel="noopener noreferrer"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Donate
                </a>
              </div>
            </div>

            <Link href="/contact" className="px-4 py-2 rounded hover:bg-gray-800">Contact</Link>
          </div>

          {/* login button */}
          <div className="flex-shrink-0">
            <Login />
          </div>
        </div>

        {/* -------------- MOBILE ACCORDION -------------- */}
        {mobileOpen && (
          <div className="md:hidden mt-3 bg-black/90 rounded-lg py-3 px-5 space-y-2">
            <Link href="/"        className="block text-white py-2" onClick={closeMobile}>Home</Link>
            <Link href="/contact" className="block text-white py-2" onClick={closeMobile}>Contact</Link>

            {/* About accordion */}
            <button
              className="flex w-full justify-between items-center text-white py-2"
              aria-expanded={mobileSection === 'about'}
              onClick={() =>
                setMobileSection(s => (s === 'about' ? null : 'about'))
              }
            >
              <span>About</span>
              <Chevron open={mobileSection === 'about'} />
            </button>
            {mobileSection === 'about' && (
              <div className="pl-4 space-y-1">
                <Link href="/about"    className="block text-white/90 py-1" onClick={closeMobile}>About Us</Link>
                <Link href="/team"     className="block text-white/90 py-1" onClick={closeMobile}>Our Team</Link>
                <Link href="/partners" className="block text-white/90 py-1" onClick={closeMobile}>Our Partners</Link>
              </div>
            )}

            {/* Media accordion */}
            <button
              className="flex w-full justify-between items-center text-white py-2"
              aria-expanded={mobileSection === 'media'}
              onClick={() =>
                setMobileSection(s => (s === 'media' ? null : 'media'))
              }
            >
              <span>Media</span>
              <Chevron open={mobileSection === 'media'} />
            </button>
            {mobileSection === 'media' && (
              <div className="pl-4 space-y-1">
                <Link href="/gallery"     className="block text-white/90 py-1" onClick={closeMobile}>Gallery</Link>
                <Link href="/testimonies" className="block text-white/90 py-1" onClick={closeMobile}>Testimonies</Link>
              </div>
            )}

            {/* Help Us accordion */}
            <button
              className="flex w-full justify-between items-center text-white py-2"
              aria-expanded={mobileSection === 'help'}
              onClick={() =>
                setMobileSection(s => (s === 'help' ? null : 'help'))
              }
            >
              <span>Help&nbsp;Us</span>
              <Chevron open={mobileSection === 'help'} />
            </button>
            {mobileSection === 'help' && (
              <div className="pl-4 space-y-1">
                <Link href="/events"   className="block text-white/90 py-1" onClick={closeMobile}>Events</Link>
                <Link href="/volunteer"className="block text-white/90 py-1" onClick={closeMobile}>Volunteer</Link>
                <a
                  href="https://hcb.hackclub.com/donations/start/music-for-patients"
                  target="_blank" rel="noopener noreferrer"
                  className="block text-white/90 py-1"
                  onClick={closeMobile}
                >
                  Donate
                </a>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

/* ---------- tiny chevron icon ---------- */
const Chevron = ({ open }: { open: boolean }) => (
  <svg
    className={`w-4 h-4 transition-transform ${open ? 'rotate-90' : ''}`}
    viewBox="0 0 20 20"
  >
    <path d="M6 6l6 4-6 4V6z" fill="currentColor" />
  </svg>
);

export default Header;
