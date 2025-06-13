'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Login from './Login';
import throttle from 'lodash/throttle';

/** Tailwind’s default `md` breakpoint = 768 px */
export default function NavBar() {
  /* ---------- shrink shadow on scroll (optional eye-candy) ---------- */
  const [elevated, setElevated] = useState(false);
  useEffect(() => {
    const onScroll = throttle(() => setElevated(window.scrollY > 10), 100);
    window.addEventListener('scroll', onScroll);
    return () => { onScroll.cancel(); window.removeEventListener('scroll', onScroll); };
  }, []);

  /* ---------- mobile state ---------- */
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);

  const closeMobile = () => { setMobileOpen(false); setMobileSection(null); };

  return (
    <>
      <nav
        className={`
          fixed inset-x-0 top-0 z-50 h-16 bg-black px-6 py-3
          transition-shadow ${elevated ? 'shadow-lg' : 'shadow-sm'}
        `}
      >
        <div className="relative flex h-full w-full items-center justify-between">
          {/* --------------- left: logo --------------- */}
          <Link href="/" className="flex-shrink-0">
            <Image src="/small-logo.png" alt="Music For Patients" width={40} height={40} priority />
          </Link>

          {/* --------------- hamburger (≤ md) --------------- */}
          <button
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(o => !o)}
            className="md:hidden p-2"
          >
            <svg className="w-6 h-6 stroke-white" fill="none" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* --------------- desktop nav (≥ md) --------------- */}
          <div
            className="
              hidden md:flex gap-10 text-white text-base items-center
              absolute left-1/2 -translate-x-1/2
            "
          >
            <Link href="/"     className="px-4 py-2 rounded hover:bg-gray-800">Home</Link>

            {/* ---------- About dropdown ---------- */}
            <DesktopDropdown label="About" root="/about">
              <Link href="/about"     className="block px-4 py-2 hover:bg-gray-100">About Us</Link>
              <Link href="/team"      className="block px-4 py-2 hover:bg-gray-100">Our Team</Link>
              <Link href="/partners"  className="block px-4 py-2 hover:bg-gray-100">Our Partners</Link>
            </DesktopDropdown>

            {/* ---------- Media dropdown ---------- */}
            <DesktopDropdown label="Media" root="/media">
              <Link href="/gallery"    className="block px-4 py-2 hover:bg-gray-100">Gallery</Link>
              <Link href="/testimonies"className="block px-4 py-2 hover:bg-gray-100">Testimonies</Link>
            </DesktopDropdown>

            {/* ---------- Help Us dropdown ---------- */}
            <DesktopDropdown label="Help Us" root="/help">
              <Link href="/events"    className="block px-4 py-2 hover:bg-gray-100">Events</Link>
              <Link href="/volunteer" className="block px-4 py-2 hover:bg-gray-100">Volunteer</Link>
              <a
                href="https://hcb.hackclub.com/donations/start/music-for-patients"
                target="_blank" rel="noopener noreferrer"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Donate
              </a>
            </DesktopDropdown>

            <Link href="/contact" className="px-4 py-2 rounded hover:bg-gray-800">Contact</Link>
          </div>

          {/* right: login */}
          <div className="flex-shrink-0">
            <Login />
          </div>
        </div>

        {/* --------------- mobile accordion panel --------------- */}
        {mobileOpen && (
          <div className="md:hidden mt-3 bg-black/90 rounded-lg py-3 px-5 space-y-2">
            <Link href="/"        className="block text-white py-2" onClick={closeMobile}>Home</Link>
            <Link href="/contact" className="block text-white py-2" onClick={closeMobile}>Contact</Link>

            <MobileAccordion
              title="About"
              open={mobileSection === 'about'}
              toggle={() => setMobileSection(s => (s === 'about' ? null : 'about'))}
            >
              <Link href="/about"    className="block text-white/90 py-1" onClick={closeMobile}>About Us</Link>
              <Link href="/team"     className="block text-white/90 py-1" onClick={closeMobile}>Our Team</Link>
              <Link href="/partners" className="block text-white/90 py-1" onClick={closeMobile}>Our Partners</Link>
            </MobileAccordion>

            <MobileAccordion
              title="Media"
              open={mobileSection === 'media'}
              toggle={() => setMobileSection(s => (s === 'media' ? null : 'media'))}
            >
              <Link href="/media"        className="block text-white/90 py-1" onClick={closeMobile}>Overview</Link>
              <Link href="/gallery"      className="block text-white/90 py-1" onClick={closeMobile}>Gallery</Link>
              <Link href="/testimonies"  className="block text-white/90 py-1" onClick={closeMobile}>Testimonies</Link>
            </MobileAccordion>

            <MobileAccordion
              title="Help Us"
              open={mobileSection === 'help'}
              toggle={() => setMobileSection(s => (s === 'help' ? null : 'help'))}
            >
              <Link href="/events"    className="block text-white/90 py-1" onClick={closeMobile}>Events</Link>
              <Link href="/volunteer" className="block text-white/90 py-1" onClick={closeMobile}>Volunteer</Link>
              <a
                href="https://hcb.hackclub.com/donations/start/music-for-patients"
                target="_blank" rel="noopener noreferrer"
                className="block text-white/90 py-1"
                onClick={closeMobile}
              >
                Donate
              </a>
            </MobileAccordion>
          </div>
        )}
      </nav>

      {/* spacer so content isn’t hidden under the fixed bar */}
      <div className="h-16" />
    </>
  );
}

/* ---------- DESKTOP dropdown helper ---------- */
function DesktopDropdown({
  label,
  root,
  children,
}: {
  label: string;
  root: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link href={root} className="px-4 py-2 rounded hover:bg-gray-800">
        {label}
      </Link>
      <div
        className={`
          absolute top-full left-0 w-52 p-2 bg-white text-black rounded shadow-md z-50
          ${open ? 'block' : 'hidden'}
        `}
      >
        {children}
      </div>
    </div>
  );
}

/* ---------- MOBILE accordion helper ---------- */
function MobileAccordion({
  title,
  open,
  toggle,
  children,
}: {
  title: string;
  open: boolean;
  toggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <>
      <button
        onClick={toggle}
        className="flex w-full justify-between items-center text-white py-2"
        aria-expanded={open}
      >
        <span>{title}</span>
        <svg
          className={`w-4 h-4 transition-transform ${open ? 'rotate-90' : ''}`}
          viewBox="0 0 20 20"
        >
          <path d="M6 6l6 4-6 4V6z" fill="currentColor" />
        </svg>
      </button>
      {open && <div className="pl-4 space-y-1">{children}</div>}
    </>
  );
}
