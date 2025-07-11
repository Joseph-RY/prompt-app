import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaTelegram } from "react-icons/fa";


export const Footer = () => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-white dark:bg-background border-t border-muted py-10 mt-16">
      <div className="px-6 md:px-8 flex flex-col md:flex-row justify-between gap-8">
        <div className="flex-1 min-w-[220px]">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">О Prompt Manager</h3>
          <p className="text-sm leading-relaxed max-w-sm">Prompt Manager — удобный инструмент для хранения и организации промптов. Упрощает поиск, создание и использование полезных шаблонов.</p>
        </div>

        <nav className="flex flex-1 justify-around min-w-[280px] text-sm">
          <div>
            <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Навигация</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                  Главная
                </Link>
              </li>
              <li>
                <Link href="/prompts" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                  Промпты
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                  Избранное
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Разделы</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                  О нас
                </Link>
              </li>
              <li>
                <Link href="/service" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                  Сервис
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Дополнительно</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/login" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                  Войти
                </Link>
              </li>
              <li>
                <Link href="/prompts/create" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                  Добавить промпт
                </Link>
              </li>
              <li>
                <Link href="mailto:support@promptmanager.com" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                  Связаться с нами
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="flex-1 min-w-[220px]">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">Контакты</h3>
          <p className="text-sm mb-1">
            Email:{" "}
            <Link href="mailto:support@promptmanager.com" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
              support@promptmanager.com
            </Link>
          </p>
          <p className="text-sm mb-4">
            Телефон:{" "}
            <Link href="tel:+1234567890" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
              +1 234 567 890
            </Link>
          </p>
          <div className="flex gap-5">
            <Link href="https://github.com/Joseph-RY" aria-label="GitHub" className="text-muted-foreground hover:text-foreground transition-colors">
              <FaGithub className="w-6 h-6" />
            </Link>
            <Link href="https://www.linkedin.com/in/yusuf-rahimov-186483372/" aria-label="LinkedIn" className="text-muted-foreground hover:text-blue-600 transition-colors">
              <FaLinkedin className="w-6 h-6" />
            </Link>
            <Link href="https://t.me/joseph_f5" aria-label="Instagram" className="text-muted-foreground hover:text-blue-400 transition-colors">
              <FaTelegram className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>

      {showTop && (
        <button onClick={scrollToTop} type="button" aria-label="Наверх" className="fixed bottom-6 right-6 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18" />
          </svg>
        </button>
      )}
    </footer>
  );
};
