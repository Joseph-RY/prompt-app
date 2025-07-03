"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPrompts } from "@/store/prompts/promptSlice";
import type { RootState, AppDispatch } from "@/store/store";

import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";

export default function PromptList() {
  const dispatch = useDispatch<AppDispatch>();
  const prompts = useSelector((state: RootState) => state.prompts.items);

  useEffect(() => {
    dispatch(getPrompts());
  }, [dispatch]);

  if (prompts.length === 0) {
    return <p className="text-center text-muted-foreground mt-24 text-lg font-semibold select-none">Промптов пока нет. Добавьте первый!</p>;
  }

  return (
    <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 min-h-[60vh] px-6">
      {prompts.map(({ id, title, category, favorite, text, tags }) => (
        <li key={id}>
          <Dialog>
            <DialogTrigger asChild>
              <button
                tabIndex={0}
                aria-label={`Открыть подробности промпта: ${title}`}
                className="
                  group relative bg-white dark:bg-gray-900 rounded-xl border border-gray-300 dark:border-gray-700 p-6 flex flex-col h-48 w-full cursor-pointer
                  hover:border-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 transition
                  duration-300 ease-in-out shadow-sm hover:shadow-lg
                  "
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 truncate max-w-[80%] group-hover:text-indigo-600 transition-colors">{title}</h3>
                  {favorite && (
                    <svg className="w-6 h-6 text-yellow-400 drop-shadow-md" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-label="Избранное">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273 -4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>

                {category && <span className="inline-block text-indigo-600 bg-indigo-100 dark:bg-indigo-900 rounded-full px-4 py-1 text-xs font-semibold mb-6 select-none">{category}</span>}

                <p className="mt-auto text-sm text-gray-600 dark:text-gray-400 select-none">Нажмите, чтобы посмотреть детали</p>
              </button>
            </DialogTrigger>

            <DialogContent className="max-w-2xl rounded-2xl p-8 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 shadow-2xl">
              <DialogTitle className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-gray-100 flex items-center gap-3">
                {title}
                {favorite && (
                  <svg className="w-7 h-7 text-yellow-400 drop-shadow-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-label="Избранное">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273 -4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                  </svg>
                )}
              </DialogTitle>

              <DialogDescription className="mb-8 whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed font-medium">{text}</DialogDescription>

              {tags?.length > 0 && (
                <div className="flex flex-wrap gap-4 mb-8">
                  {tags.map((tag) => (
                    <span key={tag} className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full px-5 py-2 text-sm font-semibold select-none shadow-lg">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <DialogClose asChild>
                <button
                  className="mt-3 w-full rounded-md bg-indigo-600 text-white py-3 text-lg font-semibold
                  hover:bg-indigo-700 transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-400"
                >
                  Закрыть
                </button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        </li>
      ))}
    </ul>
  );
}
