'use client';
import React from "react";
import FadeUp from "@/app/components/FadeUp";

export default function Mission() {
  return (
    <FadeUp>
    <div className="min-h-screen p-8 sm:p-20 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl font-bold mb-4 text-center">About Us</h1>
      
      <div className="text-lg mx-auto max-w-4xl leading-relaxed">
        <p className="mb-6">
          At <strong>Music For Patients</strong>, we believe music can make a profound impact on the lives of hospitalized individuals.
        </p>
        <p className="mb-6">
          For patients enduring weeks to even months of surgeries, procedures, and unsettling news, the hospital environment can feel isolating and emotionally exhausting. Our mission as a <strong>501(c)(3) nonprofit organization</strong> is to bring light into those dark moments by creating uplifting musical experiences that make even the hardest days just a little more bearable.
        </p>
        <p className="mb-6">
          As musicians, we’ve seen firsthand how music holds an innate ability to heal. Music serves as a powerful medium for emotional expression, especially when words fall short. It helps individuals process feelings of fear, grief, and sadness and often leads to reduced stress, lifted spirits, and a deeper sense of well-being.
        </p>
        <p className="mb-12">
          Our goal is to use music to bring hope, comfort, and a connection to patients during some of life’s most difficult challenges.
        </p>

        <h2 className="text-2xl font-semibold mb-4 mt-10 text-center">Our Mission</h2>
        <p className="mb-10">
          We transform lives by connecting patients with uplifting musical experiences tailored to heal, comfort, and inspire.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-center">Our Vision</h2>
        <p>
          We envision a world where music becomes a catalyst for change, helping patients rediscover strength, joy, and peace during their most difficult times.
        </p>
      </div>
    </div>
    </FadeUp>
  );
}
