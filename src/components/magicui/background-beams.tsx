"use client";

import React from "react";

export const BackgroundBeams = () => {
  return (
    <div className="absolute inset-0 -z-20 overflow-hidden">
      <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-full filter blur-3xl opacity-30 animate-animate-float"></div>
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 rounded-full filter blur-4xl opacity-25 animate-animate-float animation-delay-2000"></div>
    </div>
  );
};
