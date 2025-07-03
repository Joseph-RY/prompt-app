"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "react-hot-toast";
import { auth, db } from "@/lib/firebase";

export default function CreatePrompt() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
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

      const tagsArray = tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      await addDoc(collection(db, "prompts"), {
        title,
        text,
        category,
        tags: tagsArray,
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
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 space-y-6 bg-white dark:bg-gray-800 rounded-md shadow-md">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Создать новый промпт</h1>

      <div>
        <label htmlFor="title" className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Название
        </label>
        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Введите название промпта" required className="w-full" />
      </div>

      <div>
        <label htmlFor="text" className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Текст промпта
        </label>
        <Textarea id="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Введите текст промпта" required rows={6} className="w-full" />
      </div>

      <div>
        <label htmlFor="category" className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Категория
        </label>
        <Input id="category" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Введите категорию (необязательно)" className="w-full" />
      </div>

      <div>
        <label htmlFor="tags" className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Теги (через запятую)
        </label>
        <Input id="tags" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Например: ai, генерация, текст" className="w-full" />
      </div>

      <div>
        <label htmlFor="createdBy" className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Автор (createdBy)
        </label>
        <Input id="createdBy" value={createdBy} onChange={(e) => setCreatedBy(e.target.value)} placeholder="Введите ID или имя автора" required className="w-full" />
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
  );
}
