import { useRouter } from "next/navigation";
import React from "react";

export const Backer = () => {
  const router = useRouter();
  return (
    <header className="flex items-center mt-3 ml-4 bg-white dark:bg-gray-800">
      <button onClick={() => router.back()} aria-label="Назад" className="inline-flex items-center rounded-md p-2 text-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
        <span className="ml-2 text-lg font-semibold text-primary select-none">Назад</span>
      </button>
    </header>
  );
};
