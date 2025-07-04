"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPrompts } from "@/store/prompts/promptSlice";
import type { RootState, AppDispatch } from "@/store/store";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";

export default function PromptList() {
  const dispatch = useDispatch<AppDispatch>();
  const { items: prompts, loading } = useSelector((state: RootState) => state.prompts);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getPrompts());
  }, [dispatch]);

  const categories = Array.from(new Set(prompts.map((p) => p.category).filter(Boolean)));

  let filteredPrompts = prompts;
  if (selectedCategory) {
    filteredPrompts = filteredPrompts.filter((p) => p.category === selectedCategory);
  }
  if (searchTerm.trim()) {
    const lowerSearch = searchTerm.toLowerCase();
    filteredPrompts = filteredPrompts.filter((p) => p.title.toLowerCase().includes(lowerSearch));
  }

  if (loading) {
    return (
      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 min-h-[60vh] px-6 py-10">
        {Array.from({ length: 6 }).map((_, index) => (
          <li key={index} className="p-6 h-48 rounded-2xl border border-muted bg-muted/30 dark:bg-muted/60 shadow animate-pulse">
            <div className="h-4 w-3/4 rounded bg-muted-foreground/20 dark:bg-muted-foreground/30 mb-4" />
            <div className="h-3 w-1/2 rounded bg-muted-foreground/20 dark:bg-muted-foreground/30 mb-2" />
            <div className="h-3 w-full rounded bg-muted-foreground/10 dark:bg-muted-foreground/20" />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <>
      <div className="mb-8 max-w-md px-6">
        <label htmlFor="searchInput" className="block mb-2 font-semibold text-foreground">
          Поиск по заголовку
        </label>
        <input id="searchInput" type="text" placeholder="Введите текст для поиска..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full rounded-md border border-muted bg-background px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary mb-6" />

        {categories.length > 0 && (
          <>
            <label htmlFor="categoryFilter" className="block mb-2 font-semibold text-foreground">
              Фильтр по категории
            </label>
            <select id="categoryFilter" value={selectedCategory || ""} onChange={(e) => setSelectedCategory(e.target.value || null)} className="w-full rounded-md border border-muted bg-background px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary">
              <option value="">Все категории</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </>
        )}
      </div>

      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 min-h-[60vh] px-6 py-10">
        {filteredPrompts.map(({ id, title, category, favorite, text, tags }) => (
          <li key={id}>
            <Dialog>
              <DialogTrigger asChild>
                <button className="group relative p-6 h-48 w-full rounded-2xl border border-muted bg-background shadow-sm hover:shadow-md hover:bg-muted/40 transition-colors text-left cursor-pointer select-none" aria-label={`Открыть подробности промпта: ${title}`}>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors truncate max-w-[80%]">{title}</h3>
                    {favorite && (
                      <span title="Избранное" className="text-yellow-400">
                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l2.39 6.97h7.34l-5.95 4.33L17.5 21 12 16.77 6.5 21l1.72-7.7L2.27 8.97h7.34L12 2z" />
                        </svg>
                      </span>
                    )}
                  </div>

                  {category && <span className="inline-block text-primary bg-primary/10 dark:bg-primary/20 rounded-full px-4 py-1 text-xs font-semibold mb-6">{category}</span>}

                  <p className="mt-auto text-sm text-muted-foreground">Нажмите, чтобы посмотреть детали</p>
                </button>
              </DialogTrigger>

              <DialogContent className="max-w-2xl rounded-3xl p-10 bg-background border border-muted shadow-xl shadow-indigo-200/30 dark:shadow-indigo-900/50">
                <DialogTitle className="text-4xl font-extrabold mb-8 flex items-center gap-4 text-foreground dark:text-gray-100">
                  {title}
                  {favorite && (
                    <svg className="w-7 h-7 text-yellow-400 drop-shadow-lg" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" aria-label="Избранное" role="img">
                      <path d="M12 2l2.39 6.97h7.34l-5.95 4.33L17.5 21 12 16.77 6.5 21l1.72-7.7L2.27 8.97h7.34L12 2z" />
                    </svg>
                  )}
                </DialogTitle>

                <DialogDescription className="mb-10 whitespace-pre-wrap text-[14px] leading-relaxed font-medium text-muted-foreground dark:text-muted-foreground/80 tracking-wide">{text}</DialogDescription>

                {tags?.length > 0 && (
                  <div className="flex flex-wrap items-center gap-4 mb-10">
                    <span className="text-base font-semibold text-muted-foreground select-none">Тэги:</span>
                    {tags.map((tag) => (
                      <span key={tag} className="bg-muted text-muted-foreground rounded-full px-5 py-2 text-sm font-semibold shadow-md select-none cursor-default transition duration-300 ease-in-out hover:bg-muted/80">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <DialogClose asChild>
                  <button className="w-full rounded-2xl bg-primary text-white py-4 text-xl font-extrabold shadow-lg hover:bg-primary/90 active:scale-95 transition transform duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/50">Закрыть</button>
                </DialogClose>
              </DialogContent>
            </Dialog>
          </li>
        ))}
      </ul>
    </>
  );
}
