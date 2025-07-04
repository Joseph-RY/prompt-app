"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store/store";
import { getPrompts, deletePromptFirebase } from "@/store/prompts/promptSlice";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import toast from "react-hot-toast";
import { FiEdit2, FiTrash2, FiStar } from "react-icons/fi";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface Props {
  onEdit: (id: string) => void;
  noPromptsMessage?: string;
}

export default function PromptList({ onEdit, noPromptsMessage }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { items: prompts, loading } = useSelector((state: RootState) => state.prompts);
  const [deletingPromptId, setDeletingPromptId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    if (prompts.length === 0 && !loading) {
      dispatch(getPrompts());
    }
  }, [dispatch, prompts.length, loading]);

  const categories = Array.from(new Set(prompts.map((p) => p.category).filter(Boolean)));

  const filteredPrompts = selectedCategory ? prompts.filter((p) => p.category === selectedCategory) : prompts;

  const openDeleteDialog = (id: string) => setDeletingPromptId(id);
  const cancelDelete = () => setDeletingPromptId(null);

  const confirmDelete = async () => {
    if (!deletingPromptId) return;

    try {
      await dispatch(deletePromptFirebase(deletingPromptId)).unwrap();
      toast.success("✅ Промпт успешно удалён");
      setDeletingPromptId(null);
    } catch {
      toast.error("❌ Не удалось удалить промпт. Попробуйте снова.");
    }
  };

  if (loading) {
    return (
      <ul className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <li key={i} className="rounded-2xl border border-muted p-6 bg-muted/20 animate-pulse space-y-4" aria-hidden="true">
            <Skeleton className="h-7 w-5/6 rounded-md" />
            <Skeleton className="h-5 w-2/3 rounded-full" />
            <div className="flex gap-3 pt-3">
              <Skeleton className="h-9 w-24 rounded-lg" />
              <Skeleton className="h-9 w-24 rounded-lg" />
            </div>
          </li>
        ))}
      </ul>
    );
  }

  if (filteredPrompts.length === 0) {
    return <p className="text-center text-muted-foreground text-sm mt-12">{noPromptsMessage || "Промптов нет."}</p>;
  }

  return (
    <>
      {categories.length > 0 && (
        <div className="mb-8 max-w-xs">
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
        </div>
      )}

      <ul className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {filteredPrompts.map(({ id, title, category, favorite }) => (
          <li key={id} className="group relative rounded-2xl border border-muted bg-background p-6 shadow-md hover:shadow-xl transition-shadow flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-foreground mb-3 line-clamp-2">{title}</h3>
              {category && <span className="inline-block bg-primary/10 text-primary dark:bg-primary/20 px-3 py-1 text-xs rounded-full font-semibold mb-2">{category}</span>}
              {favorite && <FiStar className="absolute top-4 right-4 text-yellow-400 text-xl" title="Избранное" aria-label="Избранное" />}
            </div>

            <div className="flex justify-between gap-3 pt-5 mt-auto border-t border-muted">
              <Button variant="secondary" size="sm" className="flex items-center justify-center p-2" onClick={() => onEdit(id)} aria-label={`Редактировать промпт ${title}`}>
                <FiEdit2 className="w-5 h-5" />
              </Button>
              <Button variant="destructive" size="sm" onClick={() => openDeleteDialog(id)} aria-label={`Удалить промпт ${title}`}>
                <FiTrash2 className="w-5 h-5" />
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <Dialog open={!!deletingPromptId} onOpenChange={setDeletingPromptId}>
        <DialogContent className="max-w-md rounded-xl p-6">
          <DialogTitle className="text-lg font-bold mb-4">Подтверждение удаления</DialogTitle>
          <p className="mb-6">Вы уверены, что хотите удалить этот промпт? Это действие нельзя отменить.</p>
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={cancelDelete}>
              Отмена
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Удалить
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
