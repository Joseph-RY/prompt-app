"use client";

import React, { useState } from "react";

const allTags = ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Vue.js", "Nuxt.js", "Angular", "Svelte", "Tailwind CSS", "Bootstrap", "Material UI", "Redux", "Zustand", "Jotai", "MobX", "Recoil", "React Query", "Apollo", "GraphQL", "REST API", "Axios", "Fetch API", "Webpack", "Vite", "Parcel", "Babel", "ESLint", "Prettier", "Framer Motion", "Storybook", "Jest", "Testing Library", "Cypress", "Vitest", "Playwright", "Git", "GitHub", "CI/CD", "Netlify", "Vercel", "Firebase", "Supabase", "Strapi", "Headless CMS", "Contentful", "Sanity", "LocalStorage", "SessionStorage", "Service Workers", "PWA", "SEO", "Accessibility", "Responsive Design", "Mobile First", "SSR", "SSG", "ISR", "Hydration", "CSR", "Monorepo", "NX", "Turborepo", "Linaria", "Styled Components", "Emotion", "PostCSS", "Sass", "Less", "Atomic Design", "Design Systems", "UI Components", "Dark Mode", "Theming", "Lazy Loading", "Code Splitting", "Bundle Analyzer", "Performance Optimization", "Lighthouse", "DevTools", "React Native", "Expo", "Hybrid Apps", "Frontend Architecture", "SPA", "MPA", "Школа", "Университет", "Онлайн-курсы", "Экзамены", "Обучение за рубежом", "Повышение квалификации", "Диплом", "Стипендия", "Олимпиады", "Репетитор", "Дистанционное обучение", "Курсы", "Тренинги", "Менторство", "Учебные материалы", "Фриланс", "Карьерный рост", "HR", "Резюме", "Интервью", "Удалёнка", "Портфолио", "Зарплата", "Офис", "Трудовой договор", "Стажировка", "Нетворкинг", "Карьера", "Профессиональное обучение", "Рабочие навыки", "Кинотеатры", "Парк развлечений", "Клубы", "Фестивали", "Театры", "Караоке", "Настольные игры", "Развлекательные шоу", "Вечеринки", "Комиксы", "Футбол", "Баскетбол", "Фитнес", "Тренировки", "Олимпиада", "Йога", "Бег", "Плавание", "Тренажерный зал", "Здоровый образ жизни", "Питание", "Физическая активность", "Психическое здоровье", "Медитация", "Болезни", "Диета", "Иммунитет", "Гигиена", "ЗОЖ", "Аптечка", "Физика", "Биология", "Химия", "Космос", "Исследования", "Эксперименты", "Научные статьи", "Астрономия", "Теории", "Лаборатория", "Туризм", "Авиа", "Бюджетные поездки", "Отели", "Гиды", "Путеводители", "Пляжи", "Турфирмы", "Отпуск", "Экскурсии", "Рецепты", "Выпечка", "Национальная кухня", "Вегетарианство", "Гастрономия", "Напитки", "Кондитерка", "Ужин", "Фастфуд", "Здоровое питание", "Живопись", "Скульптура", "Современное искусство", "Галереи", "Критика", "Инсталляции", "Выставки", "Музыка", "Театр", "Фотография", "Поп", "Рок", "Классика", "Концерты", "Инструменты", "Альбомы", "Плейлисты", "DJ", "Музыкальные жанры", "Фестивали", "Инвестиции", "Бюджет", "Криптовалюта", "Банки", "Налоги", "Финансовая грамотность", "Кредиты", "Депозиты", "Акции", "Фондовый рынок", "SMM", "Брендинг", "Таргетинг", "Email-маркетинг", "Контент-маркетинг", "Аналитика", "PPC", "Реклама", "PR", "Стартап", "Предпринимательство", "Бизнес-модель", "Франшиза", "Партнёрство", "CRM", "Монетизация", "Стратегия", "Управление", "Инновации", "Одежда", "Тренды", "Дизайнеры", "Показы", "Стили", "Шопинг", "Аксессуары", "Обувь", "Парфюмерия", "Бренды", "Портрет", "Пейзаж", "Студийная съемка", "Обработка", "Техника", "RAW", "Фотосессия", "Фотоаппарат", "Фотобанк", "Свет", "Режиссёры", "Сценарии", "Жанры", "Кинофестивали", "Сериалы", "Премьеры", "Оскар", "Кастинг", "Кинокритика", "Актёры", "Электромобили", "Тест-драйв", "Марки", "Тюнинг", "Запчасти", "Автосервис", "ГИБДД", "ПДД", "Страхование", "Автошкола", "Интерьер", "Ремонт", "Отношения", "Семейный досуг", "Домашние питомцы", "Дети", "Сад", "Быт", "Кулинария", "Уют", "Консоли", "PC", "Мобильные игры", "Стриминг", "Киберспорт", "Steam", "MMORPG", "Геймдизайн", "VR", "ММО", "Классика", "Современная проза", "Поэзия", "Обзоры книг", "Авторские рецензии", "Писатели", "Чтение", "Библиотеки", "Критика", "Жанры", "Выборы", "Партии", "Геополитика", "Дипломатия", "Международные отношения", "Законы", "Политики", "Государство", "Правозащита", "Общественные инициативы", "Саморазвитие", "Тревожность", "Терапия", "Мотивация", "Сознание", "Психология личности", "Эмоции", "Поведение", "Психотерапия", "Групповая терапия", "TikTok", "Instagram", "Контент", "Блогеры", "Алгоритмы", "Тренды", "Монетизация", "SMM", "Видео", "Сообщество", "Мемы", "Анекдоты", "Стендап", "Сатира", "Приколы", "Комики", "Шутки", "Пародии", "Юмористические шоу", "Интернет юмор", "Устойчивое развитие", "Сортировка отходов", "Климат", "Эко-привычки", "Защита природы", "Зелёная энергия", "Пластик", "Возобновляемые ресурсы", "Садоводство", "Экосистема", "Законы", "Судебная практика", "Наследство", "Гражданское право", "Юридические услуги", "Контракты", "Нотариус", "Защита прав", "Уголовное право", "Административное право", "UX", "UI", "Графика", "Типографика", "Интерфейсы", "Figma", "Визуальный стиль", "Мокапы", "Прототипирование", "Цветовые схемы", "Социология", "Гендерные вопросы", "Идентичность", "Общественные движения", "Волонтерство", "Социальная справедливость", "Этика", "Права человека", "Демография", "Образование", "Христианство", "Ислам", "Буддизм", "Философия религии", "Обряды", "Молитва", "Духовность", "Ритуалы", "Священные книги", "Традиции", "Педагогика", "Детская психология", "Игры для развития", "Режим дня", "Образование детей", "Безопасность", "Развитие речи", "Питание детей", "Дисциплина", "Семейные ценности"];

interface TagsInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
}

export const TagInput = ({ tags, setTags }: TagsInputProps) => {
  const STEP = 5;
  const [inputValue, setInputValue] = useState("");
  const [visibleCount, setVisibleCount] = useState(STEP);

  const normalizedTags = tags.map((t) => t.toLowerCase());

  const filteredSuggestions = allTags.filter((tag) => {
    const lower = tag.toLowerCase();
    return !normalizedTags.includes(lower) && lower.includes(inputValue.trim().toLowerCase());
  });

  const visibleSuggestions = filteredSuggestions.slice(0, visibleCount);

  const addTag = (tag: string) => {
    if (!normalizedTags.includes(tag.toLowerCase())) {
      setTags([...tags, tag]);
    }
    setInputValue("");
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag.toLowerCase() !== tagToRemove.toLowerCase()));
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && filteredSuggestions.length > 0) {
      e.preventDefault();
      addTag(filteredSuggestions[0]);
    }
  };

  return (
    <div className="space-y-3">
      <label className="block font-semibold text-gray-700 dark:text-gray-300">Теги (поиск и выбор из подсказок)</label>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} onClick={() => removeTag(tag)} className="cursor-pointer select-none rounded-full bg-primary px-3 py-1 text-sm font-medium text-white shadow-sm hover:bg-primary/90 transition" title="Удалить тег">
            {tag} ×
          </span>
        ))}
      </div>

      <input
        type="text"
        placeholder="Начните вводить тег..."
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setVisibleCount(STEP);
        }}
        onKeyDown={handleInputKeyDown}
        className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
      />

      {visibleSuggestions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {visibleSuggestions.map((tag) => (
            <button key={tag} type="button" onClick={() => addTag(tag)} className="rounded-md border border-primary px-3 py-1 text-sm text-primary hover:bg-primary hover:text-white transition">
              {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
