"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          
          <div className="mb-4 md:mb-0 flex flex-row items-center gap-2">
            <Image
              src="/small-logo.png"
              alt="Music For Patients Logo"
              width={50}
              height={50} 
              className="mr-2"  // Adds spacing to the right of the logo
            />
            <h2 className="text-xl font-bold">Music For Patients</h2>
          </div>

          <div className="flex gap-8 text-sm">
          <Link href="/" className="text-white hover:text-gray-200">
            Home
          </Link> 
          <Link href="/about" className="text-white hover:text-gray-200">
            About Us
          </Link>
          <Link href="/team" className="text-white hover:text-gray-200">
            Meet Our Team
          </Link>
          <Link href="/events" className="text-white hover:text-gray-200">
            Events
          </Link>
          <Link href="https://hcb.hackclub.com/donations/start/music-for-patients" className="text-white hover:text-gray-200">
            Donate
          </Link>
          <Link href="/contact" className="text-white hover:text-gray-200">
            Contact Us
          </Link>
          </div>

          <div className="flex gap-4">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              <img src="/insta.png" alt="Instagram" className="w-6 h-6" /> 
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
