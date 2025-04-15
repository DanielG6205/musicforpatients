"use client";

import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold">MyWebsite</h2>
            <p className="text-sm text-gray-200 mt-2">
              Building awesome web experiences with Next.js.
            </p>
          </div>

          <div className="flex gap-8 text-sm">
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

          <div className="flex gap-4">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              <img src="/vercel.svg" alt="Instagram" className="w-6 h-6" /> 
            </a>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} MyWebsite. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
