"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { updatePromptFirebase } from "@/store/prompts/promptSlice";
import PromptList from "./components/prompt-list/prompt-list";
import PromptEditDialog from "./components/prompt-dialog/promt-dialog";

export default function Profile() {
  const dispatch = useDispatch<AppDispatch>();
  const prompts = useSelector((state: RootState) => state.prompts.items);

  const total = prompts.length;
  const favorites = prompts.filter((p) => p.favorite).length;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(prompts.map((p) => p.category).filter(Boolean))) as string[];
  const filteredPrompts = selectedCategory ? prompts.filter((p) => p.category === selectedCategory) : prompts;

  const [editingPromptId, setEditingPromptId] = useState<string | null>(null);
  const [loadingEdit, setLoadingEdit] = useState(false);

  // Состояние для формы редактирования
  const [form, setForm] = useState({ title: "", category: "", favorite: false });

  useEffect(() => {
    if (editingPromptId) {
      const prompt = prompts.find((p) => p.id === editingPromptId);
      setForm({
        title: prompt?.title || "",
        category: prompt?.category || "",
        favorite: prompt?.favorite || false,
      });
    } else setForm({ title: "", category: "", favorite: false });
  }, [editingPromptId, prompts]);

  const openEdit = (id: string) => setEditingPromptId(id);
  const closeEdit = () => !loadingEdit && setEditingPromptId(null);

  const saveEdit = async () => {
    if (!form.title.trim()) {
      toast.error("Название не может быть пустым");
      return;
    }

    setLoadingEdit(true);
    try {
      await dispatch(
        updatePromptFirebase({
          id: editingPromptId!,
          changes: {
            title: form.title.trim(),
            category: form.category.trim(),
            favorite: form.favorite,
          },
        })
      ).unwrap();

      toast.success("Промпт обновлён");
      closeEdit();
    } catch {
      toast.error("Ошибка обновления");
    } finally {
      setLoadingEdit(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <section className="flex items-center gap-6">
        <Image src="/default-avatar.png" alt="Аватар пользователя" width={80} height={80} className="rounded-full border border-muted" />
        <div>
          <h1 className="text-2xl font-bold">Имя пользователя</h1>
          <p className="text-muted-foreground text-sm">user@email.com</p>
        </div>
      </section>

      <div>
        <Link href="/create">
          <Button>Создать промпт</Button>
        </Link>
      </div>

      <section className="grid sm:grid-cols-3 gap-4 mb-6 text-center">
        <StatBlock label="Всего промптов" value={total} />
        <StatBlock label="Избранные" value={favorites} />
        <StatBlock label="Дата регистрации" value="2025-05-14" />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Ваши промпты</h2>

        <PromptList prompts={filteredPrompts} onEdit={openEdit} noPromptsMessage="У вас пока нет промптов." />

        {categories.length > 0 && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Фильтр по категории:</label>
            <select className="border rounded-md px-3 py-2 text-sm bg-background" value={selectedCategory || ""} onChange={(e) => setSelectedCategory(e.target.value || null)}>
              <option value="">Все категории</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        )}
      </section>

      {editingPromptId && <PromptEditDialog open={!!editingPromptId} loading={loadingEdit} form={form} setForm={setForm} onClose={closeEdit} onSave={saveEdit} />}
    </main>
  );
}

function StatBlock({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border bg-muted/30 p-4 text-center">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}
