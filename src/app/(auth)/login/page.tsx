"use client";

import React, { useState, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { signInWithEmailAndPassword } from "firebase/auth";
import { setUser } from "@/store/auth/authSlice";
import { auth } from "@/lib/firebase";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();

      dispatch(
        setUser({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: userCredential.user.displayName,
          photoURL: userCredential.user.photoURL,
          idToken: token,
        })
      );
      console.log(token);
      toast.success("Вы вошли в аккаунт");
      router.push("/");
    } catch (error) {
      toast.error("Ошибка входа. Проверьте данные.");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto p-6">
      <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 mb-4 border rounded" />
      <input type="password" placeholder="Пароль" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 mb-4 border rounded" />
      <button type="submit" className="w-full bg-green-600 text-white p-3 rounded">
        Войти
      </button>
    </form>
  );
}
