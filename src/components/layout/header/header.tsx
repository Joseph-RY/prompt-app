"use client";

import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { logout } from "@/store/auth/authSlice";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const [isDark, setIsDark] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await auth.signOut();
    dispatch(logout());
    router.push("/login");
  };

  const toggleDarkMode = () => {
    const root = document.documentElement;
    root.classList.toggle("dark");
    setIsDark(root.classList.contains("dark"));
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDarkMode = document.documentElement.classList.contains("dark");
      setIsDark(isDarkMode);
    }
  }, []);

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link className="text-2xl font-bold text-black dark:text-white" href="/">
          Project Logo
        </Link>

        <nav className="flex gap-6 text-gray-700 dark:text-gray-300 font-medium">
          <Link href="/" className="hover:underline">
            Главная
          </Link>
          <Link href="/prompts" className="hover:underline">
            Промпты
          </Link>
          <Link href="/service" className="hover:underline">
            Сервисы
          </Link>
          <Link href="/about" className="hover:underline">
            О нас
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <button onClick={toggleDarkMode} className="text-gray-700 dark:text-gray-300 hover:text-yellow-400 transition" title="Toggle Theme">
            {isDark ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M7.05 16.95l-1.414 1.414M16.95 16.95l1.414-1.414M7.05 7.05L5.636 5.636M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
              </svg>
            )}
          </button>

          <Link href="/favorites" className="text-gray-700 dark:text-gray-300 hover:text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          </Link>

          <Link href="/prompts/create" className="text-gray-700 dark:text-gray-300 hover:text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </Link>

          {user ? (
            <>
              {user.photoURL ? <img src={user.photoURL} alt="avatar" className="w-8 h-8 rounded-full" /> : <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white uppercase">{user.email?.[0]}</div>}
              <Button variant="default" onClick={handleLogout} className="ml-2 text-sm text-white " title="Logout">
                Выйти
              </Button>
            </>
          ) : (
            <Link href="/login" className="text-sm font-semibold text-blue-600 hover:text-blue-800">
              <Button variant="default">Войти</Button>
            </Link>
          )}

          <button className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-gray-700 dark:text-gray-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-gray-700 dark:text-gray-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="md:hidden bg-white dark:bg-gray-900 px-4 pb-4 space-y-2 shadow-md">
          <Link href="/" className="block py-2 text-gray-700 dark:text-gray-300 font-medium" onClick={() => setMenuOpen(false)}>
            Главная
          </Link>
          <Link href="/prompts" className="block py-2 text-gray-700 dark:text-gray-300 font-medium" onClick={() => setMenuOpen(false)}>
            Промпты
          </Link>
          <Link href="/service" className="block py-2 text-gray-700 dark:text-gray-300 font-medium" onClick={() => setMenuOpen(false)}>
            Сервисы
          </Link>
          <Link href="/about" className="block py-2 text-gray-700 dark:text-gray-300 font-medium" onClick={() => setMenuOpen(false)}>
            О нас
          </Link>
          <Link href="/favorites" className="block py-2 text-red-500 font-medium" onClick={() => setMenuOpen(false)}>
            Избранное
          </Link>
          <Link href="/prompts/create" className="block py-2 text-green-600 font-medium" onClick={() => setMenuOpen(false)}>
            Добавить промпт
          </Link>

          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="block w-full text-left text-white font-semibold"
            >
              Выйти
            </button>
          ) : (
            <Link href="/login" className="block py-2 text-blue-600 font-semibold" onClick={() => setMenuOpen(false)}>
              Войти
            </Link>
          )}
        </nav>
      )}
    </header>
  );
};
