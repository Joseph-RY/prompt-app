"use client";

import React from "react";

export const WavyBackground = () => {
  return (
    <svg className="absolute inset-0 -z-10 h-full w-full opacity-20 dark:opacity-30" preserveAspectRatio="none" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
      <path fill="url(#gradient)" fillOpacity="1" d="M0,64L48,69.3C96,75,192,85,288,112C384,139,480,181,576,197.3C672,213,768,203,864,176C960,149,1056,107,1152,101.3C1248,96,1344,128,1392,144L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
    </svg>
  );
};
