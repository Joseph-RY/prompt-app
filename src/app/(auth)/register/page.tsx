"use client";

import React, { useState, FormEvent } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

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
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-background dark:bg-gray-900">
      <motion.form onSubmit={handleRegister} initial={{ opacity: 0, y: 40, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.6, ease: "easeOut" }} className="w-full max-w-md p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 flex flex-col gap-6" noValidate>
        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-100">Регистрация</h2>

        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input id="email" type="email" placeholder="example@mail.com" required value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:border-primary focus:ring-1 focus:ring-primary transition" autoComplete="email" aria-describedby="email-help" />
          <p id="email-help" className="mt-1 text-xs text-gray-500 dark:text-gray-400 select-none">
            Введите корректный адрес электронной почты.
          </p>
        </div>

        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Пароль
          </label>
          <input id="password" type="password" placeholder="Минимум 6 символов" minLength={6} required value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:border-primary focus:ring-1 focus:ring-primary transition" autoComplete="new-password" aria-describedby="password-help" />
          <p id="password-help" className="mt-1 text-xs text-gray-500 dark:text-gray-400 select-none">
            Пароль должен содержать не менее 6 символов.
          </p>
        </div>

        <Button type="submit" variant="default" className="w-full h-[45px] shadow-md rounded-md" disabled={loading}>
          {loading ? "Загрузка..." : "Зарегистрироваться"}
        </Button>

        <div className="flex justify-between text-sm text-primary font-medium select-none">
          <button type="button" onClick={() => router.push("/")} className="flex items-center gap-1 hover:text-primary/80 transition select-none" aria-label="Назад">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
            </svg>
            <span>Главная</span>
          </button>

          <button type="button" onClick={() => router.push("/login")} className="hover:text-primary/80 transition" aria-label="Войти">
            Уже есть аккаунт? Войти
          </button>
        </div>
      </motion.form>
    </div>
  );
}
