import React, { useEffect, useState } from "react";

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
    <footer className="relative bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-10 mt-12">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row md:justify-between gap-8">
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-3">О Prompt Manager</h3>
          <p className="text-sm leading-relaxed">Prompt Manager — инструмент для хранения и организации промптов. Упрощает поиск, создание и использование полезных шаблонов.</p>
        </div>

        <div className="flex flex-col md:flex-row justify-between flex-1 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3">Навигация</h3>
            <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-300">
              <li>
                <a href="/" className="hover:underline">
                  Главная
                </a>
              </li>
              <li>
                <a href="/prompts" className="hover:underline">
                  Промпты
                </a>
              </li>
              <li>
                <a href="/favorites" className="hover:underline">
                  Избранное
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Разделы</h3>
            <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-300">
              <li>
                <a href="/about" className="hover:underline">
                  О нас
                </a>
              </li>
              <li>
                <a href="/service" className="hover:underline">
                  Сервис
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Дополнительно</h3>
            <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-300">
              <li>
                <a href="/login" className="hover:underline">
                  Войти
                </a>
              </li>
              <li>
                <a href="/prompts/create" className="hover:underline">
                  Добавить промпт
                </a>
              </li>
              <li>
                <a href="mailto:support@promptapp.com" className="hover:underline">
                  Связаться с нами
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-3">Контакты</h3>
          <p className="text-sm mb-1">
            Email:{" "}
            <a href="mailto:support@promptmanager.com" className="hover:underline">
              support@promptmanager.com
            </a>
          </p>
          <p className="text-sm mb-4">
            Телефон:{" "}
            <a href="tel:+1234567890" className="hover:underline">
              +1 234 567 890
            </a>
          </p>
          <div className="flex gap-4">
            <a href="#">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0 1 12 12.75Zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 0 1-1.152 6.06M12 12.75c-2.883 0-5.647.508-8.208 1.44.125 2.104.52 4.136 1.153 6.06M12 12.75a2.25 2.25 0 0 0 2.248-2.354M12 12.75a2.25 2.25 0 0 1-2.248-2.354M12 8.25c.995 0 1.971-.08 2.922-.236.403-.066.74-.358.795-.762a3.778 3.778 0 0 0-.399-2.25M12 8.25c-.995 0-1.97-.08-2.922-.236-.402-.066-.74-.358-.795-.762a3.734 3.734 0 0 1 .4-2.253M12 8.25a2.25 2.25 0 0 0-2.248 2.146M12 8.25a2.25 2.25 0 0 1 2.248 2.146M8.683 5a6.032 6.032 0 0 1-1.155-1.002c.07-.63.27-1.222.574-1.747m.581 2.749A3.75 3.75 0 0 1 15.318 5m0 0c.427-.283.815-.62 1.155-.999a4.471 4.471 0 0 0-.575-1.752M4.921 6a24.048 24.048 0 0 0-.392 3.314c1.668.546 3.416.914 5.223 1.082M19.08 6c.205 1.08.337 2.187.392 3.314a23.882 23.882 0 0 1-5.223 1.082" />
              </svg>
            </a>
            <a href="#">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
              </svg>
            </a>
            <a href="#">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {showTop && (
        <button onClick={scrollToTop} className="fixed bottom-6 right-6 p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition" aria-label="Наверх">
          ↑
        </button>
      )}
    </footer>
  );
};
