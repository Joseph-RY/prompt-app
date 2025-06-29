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
        {/* О проекте */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-3">О Prompt Manager</h3>
          <p className="text-sm leading-relaxed">Prompt Manager — инструмент для хранения и организации промптов. Упрощает поиск, создание и использование полезных шаблонов.</p>
        </div>

        <div className="flex flex-col md:flex-row justify-between flex-1 gap-8">
          {/* Навигация */}
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

          {/* Разделы */}
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

          {/* Дополнительно */}
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

        {/* Контакты */}
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
              <span className="sr-only">Twitter</span>🐦
            </a>
            <a href="#">
              <span className="sr-only">LinkedIn</span>💼
            </a>
            <a href="#">
              <span className="sr-only">GitHub</span>💻
            </a>
          </div>
        </div>
      </div>

      {/* Кнопка наверх */}
      {showTop && (
        <button onClick={scrollToTop} className="fixed bottom-6 right-6 p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition" aria-label="Наверх">
          ↑
        </button>
      )}
    </footer>
  );
};
