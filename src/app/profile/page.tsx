"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { updatePromptFirebase } from "@/store/prompts/promptSlice";
import PromptList from "./components/prompt-list/prompt-list";
import PromptEditDialog from "./components/prompt-dialog/prompt-dialog";
import { FaUser, FaStar } from "react-icons/fa";
import { HiOutlineCalendar } from "react-icons/hi";

export default function Profile() {
  const dispatch = useDispatch<AppDispatch>();

  // FIX: items -> prompts
  const prompts = useSelector((state: RootState) => state.prompts.prompts);

  const total = prompts.length;
  const favorites = useMemo(() => prompts.filter((p) => p.favorite).length, [prompts]);

  const [editingPromptId, setEditingPromptId] = useState<string | null>(null);
  const [loadingEdit, setLoadingEdit] = useState(false);

  const [form, setForm] = useState({ title: "", category: "", favorite: false });

  const currentPrompt = useMemo(
    () => (editingPromptId ? prompts.find((p) => p.id === editingPromptId) : null),
    [editingPromptId, prompts]
  );

  useEffect(() => {
    if (currentPrompt) {
      setForm({
        title: currentPrompt.title || "",
        category: currentPrompt.category || "",
        favorite: !!currentPrompt.favorite,
      });
    } else {
      setForm({ title: "", category: "", favorite: false });
    }
  }, [currentPrompt]);

  const openEdit = (id: string) => setEditingPromptId(id);
  const closeEdit = () => !loadingEdit && setEditingPromptId(null);

  const saveEdit = async () => {
    if (!editingPromptId || !currentPrompt) return;

    if (!form.title.trim()) {
      toast.error("Название не может быть пустым");
      return;
    }

    setLoadingEdit(true);
    try {
      await dispatch(
        updatePromptFirebase({
          ...currentPrompt,
          title: form.title.trim(),
          category: form.category.trim(),
          favorite: form.favorite,
        })
      ).unwrap();

      toast.success("Промпт обновлён");
      closeEdit();
    } catch (e: any) {
      toast.error(e?.message || "Ошибка обновления");
    } finally {
      setLoadingEdit(false);
    }
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-12 space-y-10">
      <section className="flex items-center gap-6 bg-muted/20 p-6 rounded-2xl border border-muted">
        <Image
          src="/default-avatar.png"
          alt="Аватар пользователя"
          width={90}
          height={90}
          className="rounded-full border border-muted shadow-sm"
        />
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-1 flex items-center gap-2">
            <FaUser className="text-muted-foreground" />
            user@gmail.com
          </h1>
          <p className="text-muted-foreground text-sm">Имя пользователя</p>
        </div>
        <div className="ml-auto">
          <Link href="/create">
            <Button size="lg">+ Новый промпт</Button>
          </Link>
        </div>
      </section>

      <section className="grid sm:grid-cols-3 gap-4 mb-6 text-center">
        <StatBlock label="Всего промптов" value={total} icon={<FaUser className="text-blue-500" />} />
        <StatBlock label="Избранные" value={favorites} icon={<FaStar className="text-yellow-400" />} />
        <StatBlock label="Дата регистрации" value="2025-05-14" icon={<HiOutlineCalendar className="text-green-500" />} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Ваши промпты</h2>
        <PromptList onEdit={openEdit} noPromptsMessage="У вас пока нет промптов." />
      </section>

      {editingPromptId && (
        <PromptEditDialog
          open={!!editingPromptId}
          loading={loadingEdit}
          form={form}
          setForm={setForm}
          onClose={closeEdit}
          onSave={saveEdit}
        />
      )}
    </main>
  );
}

function StatBlock({ label, value, icon }: { label: string; value: string | number; icon: React.ReactNode }) {
  return (
    <div className="rounded-xl border bg-muted/30 p-4 text-center shadow-sm">
      <div className="flex justify-center mb-2 text-xl">{icon}</div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}
