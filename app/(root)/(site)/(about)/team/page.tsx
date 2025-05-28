'use client';
import TeamMember from "../../../../components/TeamMember";
import React from "react";

export default function Team() {
    return (
    <div className="grid grid-rows-[auto_1fr_auto] justify-items-center
                      min-h-screen p-8 sm:p-20 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl font-bold mb-4">Meet The Team</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Team Member 1 */}
        <TeamMember
          name="Daniel Oh"
          imageSrc="/team/danny.jpg"
          description="Daniel Oh is a junior at River Hill High School and lives with his parents, Jung and Hannah Oh, and his sister, Emily. Introduced to the bassoon seven years ago, he quickly discovered a passion for its rich, expressive sound. As First Chair Bassoonist of the Maryland All-State Orchestra and Principal Bassoon of the Baltimore Symphony Youth Orchestra, Daniel has performed challenging works such as Rimsky-Korsakov’s Scheherazade, Respighi’s Pines of Rome, and Beethoven’s 7th and 9th Symphonies. He toured Europe with the BSYO, appearing in five renowned halls including Dvořák Hall in Prague, and presented Mozart’s Sonata in B-flat for Bassoon and Cello. In addition, he has stepped in as a professional substitute for the Howard County Youth Orchestra for Prokofiev’s Romeo and Juliet and served as bassoonist in the Howard County Gifted and Talented Band. Beyond orchestra and chamber music, Daniel also swam competitively for more than 10 years, being a 2x National Speedo Sectional Qualifier in the 4x200 m Freestyle Relay  and a 7x State Swimming Championship Qualifier while getting 2nd Place in the 4x200 y Free Relay. Additionally, he's representing Maryland for Swimming at the 23rd Korean American National Sports Festival in June. Daniel plans to study mathematics and computer science in college. When he steps away from the bassoon, he enjoys shooting hoops with friends and eating food. Driven by curiosity, leadership, and hard work, he is dedicated to using music and education to inspire and connect communities."
          linkedinUrl="https://www.linkedin.com/in/danieljungoh/"
        />
        
        {/* Team Member 2 */}
        <TeamMember
          name="Ayush Mishra"
          imageSrc="/team/ayush.jpg"
          description="Ayush N. Mishra is a junior at River Hill High School in Clarksville, Maryland, and resides with his parents and older brother, a college freshman. Ayush has been studying and mastering percussion for the last seven years under the guidance of his private tutor, Robert Miller, and his high school band director, Michael Blackman. His musical proficiency has earned him spots in several prestigious ensembles, including Howard County’s G/T Band and Youth Orchestra and Maryland's All-State Band and Orchestra. Ayush is a member of River Hill High School’s Wind Ensemble, Marching Band, and Jazz Band. He also performs with a band he formed with his friends named Honey Mustard. Ayush has participated in numerous musical competitions, achieving honorable mentions in the 2023 HCYO Concerto Competition and the 2024 Army Band Concerto Competition. He was also awarded 2nd place in the 2023 FMMC Ross Roberts High School Competition. Beyond music, Ayush enjoys playing sports with his friends and exploring his passion for computer science by developing applications, including those related to music."
          linkedinUrl="https://www.linkedin.com/in/ayush-mishra-671495341/"
        />
        
        {/* Team Member 3 */}
        <TeamMember
          name="Jay Patel"
          imageSrc="/team/jay.jpg"
          description="Jay Patel is also known as TheRanger991."
          linkedinUrl="https://www.linkedin.com/in/jay-patel-00652a320/"
        />
        
        {/* Team Member 4 */}
        <TeamMember
          name="Daniel Gao"
          imageSrc="/small-logo.png"
          description="The webmaster."
          linkedinUrl="https://www.linkedin.com/in/danielhgao/"
        />
      </div>
    </div>
    );
  }
  