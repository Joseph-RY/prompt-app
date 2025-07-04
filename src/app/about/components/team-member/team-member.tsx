import React from "react";

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
}

export const TeamMember = ({ name, role, image }: TeamMemberProps) => {
  return (
    <div className="rounded-2xl overflow-hidden shadow-xl w-full max-w-sm transition hover:scale-[1.02] dark:border">
      <div className="w-full h-[240px] overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover object-center" />
      </div>
      <div className="p-5 text-center">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
      </div>
    </div>
  );
};
