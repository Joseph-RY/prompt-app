"use client";

import React, { useState, FormEvent } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();

      localStorage.setItem("access_token", token);
      localStorage.setItem("user_email", userCredential.user.email || "");

      toast.success("Вы вошли в аккаунт");
      window.location.reload();
      router.push("/");
    } catch (error) {
      toast.error("Ошибка входа. Проверьте данные.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-[65vh] pt-40">
      <div>
        <form onSubmit={handleLogin} className="max-w-md mx-auto p-8 bg-white dark:bg-gray-900 rounded-lg shadow-xl" noValidate>
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input id="email" type="email" placeholder="example@mail.com" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition" autoComplete="email" aria-describedby="email-help" />
            <p id="email-help" className="mt-1 text-xs text-gray-500 dark:text-gray-400 select-none">
              Введите корректный адрес электронной почты.
            </p>
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Пароль
            </label>
            <input id="password" type="password" placeholder="Минимум 6 символов" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition" autoComplete="current-password" aria-describedby="password-help" />
            <p id="password-help" className="mt-1 text-xs text-gray-500 dark:text-gray-400 select-none">
              Пароль должен содержать не менее 6 символов.
            </p>
          </div>

          <Button type="submit" variant="default" className="whitespace-nowrap cursor-pointer w-full h-[45px] shadow-md rounded-md">
            Войти
          </Button>
        </form>
      </div>
    </div>
  );
}
