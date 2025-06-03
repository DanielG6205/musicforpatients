'use client';
import React, { useState } from "react";
import Image from "next/image";

interface TeamMemberProps {
  name: string;
  imageSrc: string;
  description: string;
  onClick?: () => void;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, imageSrc, description, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex flex-col items-center gap-2 w-72">
      <div className="text-2xl font-semibold text-gray-800 text-center">{name}</div>

      <div
        className="relative h-96 bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        <div className="relative w-full h-full">
          <Image
            src={imageSrc}
            alt={name}
            fill
            style={{ objectFit: "cover" }}
            className="w-full h-full"
          />
        </div>

        {isHovered && (
          <div className="absolute inset-0 bg-black opacity-80 text-white p-4 flex items-center justify-center text-center">
            <div className="max-h-full overflow-y-auto w-full scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-800">
              <p className="text-sm">{description.substring(0, 200)}...  Read More</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamMember;
