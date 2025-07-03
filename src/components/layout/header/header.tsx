"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

interface User {
  email: string | null;
  photoURL: string | null;
}

export const Header = () => {
  const [isDark, setIsDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const email = localStorage.getItem("user_email");
    if (token && email) {
      setUser({ email, photoURL: null });
    } else {
      setUser(null);
    }
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_email");
    setUser(null);
    router.push("/login");
  };

  const toggleDarkMode = () => {
    const root = document.documentElement;
    root.classList.toggle("dark");
    setIsDark(root.classList.contains("dark"));
  };

  return (
    <header className="bg-white dark:bg-background border-b border-muted">
      <div className="px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold text-black dark:text-white select-none hover:opacity-90 transition-opacity cursor-pointer">
          Project Logo
        </Link>

        <nav className="hidden md:flex gap-8 font-semibold text-base tracking-wide text-black dark:text-white">
          <Link href="/" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors cursor-pointer">
            Главная
          </Link>
          <Link href="/prompts" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors cursor-pointer">
            Промпты
          </Link>
          <Link href="/service" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors cursor-pointer">
            Сервисы
          </Link>
          <Link href="/about" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors cursor-pointer">
            О нас
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <button onClick={toggleDarkMode} title="Переключить тему" aria-label="Toggle Theme" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer">
            {isDark ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="size-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M7.05 16.95l-1.414 1.414 M16.95 16.95l1.414-1.414M7.05 7.05L5.636 5.636M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="size-7 text-black dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
              </svg>
            )}
          </button>

          {user ? (
            <Popover>
              <PopoverTrigger asChild>
                <button title="Меню пользователя" aria-label="User menu" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 rounded-full text-black dark:text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-52 p-3 bg-background dark:bg-background border border-muted rounded-md shadow-lg">
                <p className="mb-3 text-sm text-black dark:text-white leading-snug">
                  Вы вошли как
                  <br />
                  <strong className="break-words">{user.email}</strong>
                </p>
                <hr className="border-muted mb-3" />
                <Button
                  variant="ghost"
                  className="w-full justify-start mb-2 cursor-pointer text-black dark:text-white"
                  onClick={() => {
                    router.push("/profile");
                    setMenuOpen(false);
                  }}
                >
                  Профиль
                </Button>
                <Button variant="ghost" className="w-full justify-start text-red-600 hover:bg-red-50 dark:hover:bg-red-900 cursor-pointer" onClick={handleLogout}>
                  Выйти
                </Button>
              </PopoverContent>
            </Popover>
          ) : (
            <Link href="/login" className=" cursor-pointer">
              <Button variant="default" className="whitespace-nowrap cursor-pointer">
                Войти
              </Button>
            </Link>
          )}

          <button className="md:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-black dark:text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-black dark:text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="md:hidden bg-white dark:bg-background px-6 py-5 space-y-3 shadow-md border-t border-muted">
          <Link href="/" className="block py-2 text-black dark:text-white font-semibold rounded hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors cursor-pointer" onClick={() => setMenuOpen(false)}>
            Главная
          </Link>
          <Link href="/prompts" className="block py-2 text-black dark:text-white font-semibold rounded hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors cursor-pointer" onClick={() => setMenuOpen(false)}>
            Промпты
          </Link>
          <Link href="/service" className="block py-2 text-black dark:text-white font-semibold rounded hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors cursor-pointer" onClick={() => setMenuOpen(false)}>
            Сервисы
          </Link>
          <Link href="/about" className="block py-2 text-black dark:text-white font-semibold rounded hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors cursor-pointer" onClick={() => setMenuOpen(false)}>
            О нас
          </Link>

          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-red-600 font-semibold rounded hover:bg-red-100 dark:hover:bg-red-900 transition-colors cursor-pointer"
            >
              Выйти
            </button>
          ) : (
            <Link href="/login" className="block py-2 text-blue-600 font-semibold rounded hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors cursor-pointer" onClick={() => setMenuOpen(false)}>
              Войти
            </Link>
          )}
        </nav>
      )}
    </header>
  );
};
