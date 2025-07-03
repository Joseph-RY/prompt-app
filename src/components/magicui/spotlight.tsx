"use client";

import React, { useState } from "react";

interface SpotlightProps {
  title?: string;
  placeholder?: string;
  onSearch: (query: string) => void;
}

export const Spotlight: React.FC<SpotlightProps> = ({ title = "Поиск", placeholder = "Введите запрос...", onSearch }) => {
  const [query, setQuery] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(query);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100">{title}</h2>
      <input type="text" className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" placeholder={placeholder} value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={handleKeyDown} />
    </div>
  );
};
