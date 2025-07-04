import React from "react";
import Image from "next/image";

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
}

export const TeamMember = ({ name, role, image }: TeamMemberProps) => {
  return (
    <div className="rounded-2xl overflow-hidden shadow-xl w-full max-w-sm transition hover:scale-[1.02] dark:border">
      <div className="w-full h-[240px] relative">
        <Image src={image} alt={name} fill className="object-cover object-center" sizes="(max-width: 640px) 100vw, 33vw" priority />
      </div>
      <div className="p-5 text-center">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
      </div>
    </div>
  );
};
