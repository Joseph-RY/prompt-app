"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

function truncate(text: string, maxLength = 150) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

export default function PromptList() {
  const prompts = useSelector((state: RootState) => state.prompts.items);

  if (!prompts.length) {
    return <p>Промптов пока нет.</p>;
  }

  return (
    <ul className="space-y-6">
      {prompts.map(({ id, title, text, category, tags, favorite, createdBy }) => (
        <li
          key={id}
          className="border rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-800"
        >
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">{title}</h2>
            {favorite && (
              <span
                title="Избранное"
                className="text-yellow-400 text-2xl select-none"
              >
                ★
              </span>
            )}
          </div>

          <p className="mb-3 text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
            {truncate(text, 150)}
          </p>

          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-2">
            <span className="bg-blue-100 dark:bg-blue-900 px-2 py-0.5 rounded">
              {category}
            </span>
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="text-xs text-gray-400 dark:text-gray-500">
            Создал: {createdBy || "неизвестно"}
          </div>
        </li>
      ))}
    </ul>
  );
}
