"use client";

import React, { useState, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setUser } from "@/store/auth/authSlice";
import { auth } from "@/lib/firebase";
import { toast } from "react-hot-toast";

export default function Register() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      dispatch(
        setUser({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: userCredential.user.displayName,
          photoURL: userCredential.user.photoURL,
        })
      );

      toast.success("Вы успешно зарегистрировались!");
    } catch (error) {
      toast.error("Ошибка при регистрации");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleRegister} className="max-w-md mx-auto p-6">
      <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 mb-4 border rounded" />
      <input type="password" placeholder="Пароль" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 mb-4 border rounded" />
      <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded">
        Зарегистрироваться
      </button>
    </form>
  );
}
