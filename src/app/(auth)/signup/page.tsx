"use client";

import React, { useState, FormEvent } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();

      localStorage.setItem("access_token", idToken);
      localStorage.setItem("user_email", userCredential.user.email || "");

      toast.success("Вы успешно зарегистрировались!");
      router.push("/login");
    } catch (error) {
      toast.error("Ошибка при регистрации. Проверьте данные и попробуйте снова.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="max-w-md mx-auto p-8 bg-white dark:bg-neutral-900 rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700 flex flex-col gap-6">
      <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 text-center">Регистрация</h2>
      <div className="flex flex-col">
        <label htmlFor="email" className="mb-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Email
        </label>
        <input id="email" type="email" placeholder="example@mail.com" required value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-md border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-1 transition" disabled={loading} />
      </div>

      <div className="flex flex-col">
        <label htmlFor="password" className="mb-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Пароль
        </label>
        <input id="password" type="password" placeholder="Минимум 6 символов" minLength={6} required value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-md border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-1 transition" disabled={loading} />
      </div>

      <button type="submit" disabled={loading} className={`w-full py-3 rounded-md font-semibold text-white bg-gradient-to-r from-neutral-700 to-neutral-900 hover:from-neutral-800 hover:to-neutral-950 disabled:opacity-60 disabled:cursor-not-allowed transition`}>
        {loading ? "Загрузка..." : "Зарегистрироваться"}
      </button>
    </form>
  );
}
