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
    return <p className="text-center text-muted-foreground mt-20 text-lg">Промптов пока нет. Добавьте первый!</p>;
  }

  return (
    <ul className="min-h-[55vh] grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {prompts.map(({ id, title, category, favorite, text, tags }) => (
        <li key={id} className="cursor-pointer">
          <Dialog>
            <DialogTrigger asChild>
              <div tabIndex={0} aria-label={`Открыть подробности промпта: ${title}`} className="group bg-background rounded-xl p-5 shadow-sm hover:shadow-md border transition-shadow flex flex-col justify-between h-40">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-foreground truncate max-w-[85%] group-hover:text-primary transition-colors">{title}</h3>
                  {favorite && (
                    <svg className="w-6 h-6 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-label="Избранное">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.975a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.385 2.455a1 1 0 00-.364 1.118l1.287 3.974c.3.922-.755 1.688-1.538 1.118L10 13.347l-3.384 2.456c-.783.57-1.838-.196-1.538-1.118l1.286-3.974a1 1 0 00-.364-1.118L3.615 9.402c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.975z" />
                    </svg>
                  )}
                </div>

                {category && <span className="inline-block bg-muted rounded-full px-3 py-1 text-xs font-medium select-none w-max text-muted-foreground">{category}</span>}

                <div className="mt-auto text-sm text-muted-foreground select-none">Нажмите, чтобы посмотреть детали</div>
              </div>
            </DialogTrigger>

            <DialogContent className="max-w-lg rounded-xl p-6 bg-background border border-muted shadow-md">
              <DialogTitle className="text-xl font-semibold mb-4 text-foreground">{title}</DialogTitle>

              {favorite && (
                <p className="text-yellow-500 font-semibold mb-3 select-none" title="Избранное">
                  ★ Избранное
                </p>
              )}

              <DialogDescription className="mb-4 whitespace-pre-wrap text-muted-foreground">{text}</DialogDescription>

              <div className="flex flex-wrap gap-2 mb-4">
                {tags?.map((tag) => (
                  <span key={tag} className="bg-muted rounded-full px-3 py-1 text-xs font-medium select-none text-muted-foreground">
                    #{tag}
                  </span>
                ))}
              </div>

              <DialogClose asChild>
                <button className="mt-4 w-full rounded-md bg-muted px-4 py-2 text-center text-foreground hover:bg-muted/80 transition">Закрыть</button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        </li>
      ))}
    </ul>
  );
}
