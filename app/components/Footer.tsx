import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-purple-900 text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* ---------- top row (stack → row) ---------- */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          
          {/* brand */}
          <div className="flex items-center gap-2">
            <Image
              src="/small-logo.png"
              alt="Music For Patients logo"
              width={48}
              height={48}
              priority
            />
            <h2 className="text-lg font-semibold sm:text-xl">
              Music For Patients
            </h2>
          </div>

          {/* nav links */}
          <nav className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-sm">
            <Link href="/"        className="hover:text-gray-300">Home</Link>
            <Link href="/about"   className="hover:text-gray-300">About&nbsp;Us</Link>
            <Link href="/team"    className="hover:text-gray-300">Meet&nbsp;Our&nbsp;Team</Link>
            <Link href="/events"  className="hover:text-gray-300">Events</Link>
            <Link href="/donate"  className="hover:text-gray-300">Donate</Link>
            <Link href="/contact" className="hover:text-gray-300">Contact&nbsp;Us</Link>
          </nav>

          {/* social icons */}
          <div className="flex justify-center md:justify-end gap-4">
            <a
              href="https://www.instagram.com/music4patients/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:opacity-80"
            >
              <Image src="/insta.png" alt="" width={24} height={24} />
            </a>
          </div>
        </div>

        {/* ---------- copyright ---------- */}
        <p className="mt-8 text-center text-xs text-gray-400">
          &copy; {year} Music For Patients. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
