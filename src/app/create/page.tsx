"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { auth, db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { TagInput } from "./components/tag-input/tag-input";
import { Backer } from "@/components/custom/backer/backer";
import { TypingAnimation } from "@/components/magicui/typing-animation";

const categories = ["Образование", "Работа", "Развлечения", "Спорт", "Технологии", "Здоровье", "Наука", "Путешествия", "Кулинария", "Искусство", "Музыка", "Финансы", "Маркетинг", "Бизнес", "Мода", "Фотография", "Кино", "Авто", "Дом и семья", "Игры", "Литература", "Политика", "Психология", "Социальные сети", "Юмор", "Экология", "Юриспруденция", "Дизайн", "Общество", "Религия", "Дети и воспитание"];

export default function CreatePromptPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [createdBy, setCreatedBy] = useState("");
  const [favorite, setFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !text.trim()) {
      toast.error("Пожалуйста, заполните название и текст промпта");
      return;
    }

    setLoading(true);

    try {
      const user = auth.currentUser;
      if (!user) {
        toast.error("Пользователь не авторизован");
        setLoading(false);
        return;
      }

      await addDoc(collection(db, "prompts"), {
        title,
        text,
        category,
        tags,
        favorite,
        createdBy,
        createdAt: serverTimestamp(),
      });

      toast.success("Промпт успешно создан");
      router.push("/prompts");
    } catch (error) {
      toast.error("Ошибка при создании промпта");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900 flex flex-col">
      <Backer />

      <motion.main initial={{ opacity: 0, y: 40, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: [1, 1.05, 1] }} transition={{ duration: 0.7, ease: "easeOut" }} className="flex-grow overflow-auto px-6 py-4 max-w-3xl mx-auto w-full">
        <div className="h-9 mb-8">
          <TypingAnimation delay={900} className="text-3xl font-bold text-foreground dark:text-gray-100 text-center">
            Создать новый промпт
          </TypingAnimation>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 rounded-md p-8 shadow-lg">
          <div>
            <label htmlFor="title" className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">
              Название
            </label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Введите название промпта" required />
          </div>

          <div>
            <label htmlFor="text" className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">
              Текст промпта
            </label>
            <Textarea className="resize-none" id="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Введите текст промпта" required rows={6} />
          </div>

          <div>
            <label htmlFor="category" className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">
              Категория
            </label>
            <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition">
              <option value="">-- Выберите категорию --</option>
              {categories.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </div>

          <TagInput tags={tags} setTags={setTags} />

          <div>
            <label htmlFor="createdBy" className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">
              Автор (createdBy)
            </label>
            <Input id="createdBy" value={createdBy} onChange={(e) => setCreatedBy(e.target.value)} placeholder="Введите имя автора" required />
            <p className="mt-1 text-xs text-muted-foreground">Например: Syntax Studio, Promptium или PromptLab</p>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="favorite" checked={favorite} onCheckedChange={(checked) => setFavorite(Boolean(checked))} />
            <label htmlFor="favorite" className="font-medium text-gray-700 dark:text-gray-300 select-none">
              Избранное
            </label>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Создание..." : "Создать промпт"}
          </Button>
        </form>
      </motion.main>
    </div>
  );
}
