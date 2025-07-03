"use client";

import React from "react";

interface HoverBorderGradientProps {
  children: React.ReactNode;
  className?: string;
}

export const HoverBorderGradient: React.FC<HoverBorderGradientProps> = ({ children, className }) => {
  return (
    <div className={`relative rounded-xl border border-transparent p-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:via-indigo-500 hover:to-purple-500 transition-all ${className}`}>
      <div className="bg-background dark:bg-gray-900 rounded-lg p-4">{children}</div>
    </div>
  );
};
