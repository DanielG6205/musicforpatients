'use client';
import TeamMember from "../../../../components/TeamMember";
import React, { useState } from "react";
import Image from "next/image";
import FadeUp from "@/app/components/FadeUp";

interface MemberData {
  name: string;
  imageSrc: string;
  description: string;
}

export default function Team() {
  const [selectedMember, setSelectedMember] = useState<MemberData | null>(null);

  const teamMembers: MemberData[] = [
    {
      name: "Daniel Oh",
      imageSrc: "/team/danny.jpg",
      description:"Daniel Oh is a junior at River Hill High School and lives with his parents, Jung and Hannah Oh, and his sister, Emily. Introduced to the bassoon seven years ago, he quickly discovered a passion for its rich, expressive sound. \n\n As First Chair Bassoonist of the Maryland All-State Orchestra and Principal Bassoon of the Baltimore Symphony Youth Orchestra, Daniel has performed challenging works such as Rimsky-Korsakov’s Scheherazade, Respighi’s Pines of Rome, and Beethoven’s 7th and 9th Symphonies. He toured Europe with the BSYO, appearing in five renowned halls including Dvořák Hall in Prague, and presented Mozart’s Sonata in B-flat for Bassoon and Cello. In addition, he has stepped in as a professional substitute for the Howard County Youth Orchestra for Prokofiev’s Romeo and Juliet and served as bassoonist in the Howard County Gifted and Talented Band. \n\nBeyond orchestra and chamber music, Daniel also swam competitively for more than 10 years, being a 2x National Speedo Sectional Qualifier in the 4x200 m Freestyle Relay  and a 7x State Swimming Championship Qualifier while getting 2nd Place in the 4x200 y Free Relay. Additionally, he's representing Maryland for Swimming at the 23rd Korean American National Sports Festival in June.\n\nDaniel plans to study mathematics and computer science in college. When he steps away from the bassoon, he enjoys shooting hoops with friends and eating food. Driven by curiosity, leadership, and hard work, he is dedicated to using music and education to inspire and connect communities.",
    },
    {
      name: "Ayush Mishra",
      imageSrc: "/team/ayush.jpg",
      description: "Ayush N. Mishra is a junior at River Hill High School in Clarksville, Maryland, and resides with his parents and older brother, a college freshman. Ayush has been studying and mastering percussion for the last seven years under the guidance of his private tutor, Robert Miller, and his high school band director, Michael Blackman. His musical proficiency has earned him spots in several prestigious ensembles, including Howard County’s G/T Band and Youth Orchestra and Maryland's All-State Band and Orchestra. Ayush is a member of River Hill High School’s Wind Ensemble, Marching Band, and Jazz Band. He also performs with a band he formed with his friends named Honey Mustard. Ayush has participated in numerous musical competitions, achieving honorable mentions in the 2023 HCYO Concerto Competition and the 2024 Army Band Concerto Competition. He was also awarded 2nd place in the 2023 FMMC Ross Roberts High School Competition. Beyond music, Ayush enjoys playing sports with his friends and exploring his passion for computer science by developing applications, including those related to music."
    },
    {
      name: "Jay Patel",
      imageSrc: "/team/jay.jpg",
      description: "Jay Patel is a junior at River Hill High School. He is passionate about technology, which drives both his academic and extracurricular pursuits. As a former violinist, Jay is a strong believer in the power of music and its ability to bring comfort and build connections. \n\nAs a CyberPatriot team captain, Jay has led his team through system hardening, digital forensics, and network security challenges, qualifying for the national semifinals in the platinum tier and ranking in the top 1% nationwide. Additionally, he actively participates in several other competitions and is currently working toward industry certifications, consistently enhancing his expertise and preparing for future challenges. \n\nOutside of the competitive scene, Jay enjoys volunteering and teaching younger students about STEM. From presenting at coding workshops to writing cybersecurity articles, he enjoys getting involved and leaving a positive impact on his community. \n\nAfter high school, Jay plans to pursue an education in computer engineering and cybersecurity. In his downtime, he enjoys reading a good sci-fi book, watching movies and TV shows, and spending quality time with family and friends. Driven by his curiosity and empathy, Jay is dedicated to using his talents to innovate and support communities in meaningful ways."
},
    {
      name: "Daniel Gao",
      imageSrc: "/team/dgao.jpg",
      description: "Daniel Gao is a junior at River Hill High School. He is interested in computer science, but more specifically in Machine Learning and AI. A fun fact about Daniel is that he is the webmaster of Music For Patients!",
    },
  ];

  return (
    <FadeUp>
    <div className="grid grid-rows-[auto_1fr_auto] justify-items-center min-h-screen p-8 sm:p-20 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl font-bold mb-4">Meet The Team</h1>

      {/* Expanded View */}
      {selectedMember && (
        <div className="w-full max-w-5xl bg-white shadow-2xl p-8 rounded-lg relative">
          <button
            onClick={() => setSelectedMember(null)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative w-full md:w-1/2 h-96 overflow-hidden">
              <Image
                src={selectedMember.imageSrc}
                alt={selectedMember.name}
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg object-top"
              />
            </div>
            <div className="md:w-1/2 text-left max-h-[24rem] overflow-y-auto">
              <h2 className="text-2xl font-semibold mb-2">{selectedMember.name}</h2>
              <p className="text-gray-700 whitespace-pre-line">{selectedMember.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {teamMembers.map((member, idx) => (
          <TeamMember
            key={idx}
            {...member}
            onClick={() => setSelectedMember(member)}
          />
        ))}
      </div>
    </div>
    </FadeUp>
  );
}
