"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { InfiniteMovingCards } from "@/components/magicui/infinite-moving-cards";
import { motion } from "framer-motion";

export default function HomePage() {
  const howItWorks = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-12 w-12 mx-auto mb-3">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25" />
        </svg>
      ),
      title: "Сохраняйте",
      desc: "Добавляйте и редактируйте ваши любимые промпты.",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-12 w-12 mx-auto mb-3">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      ),
      title: "Ищите",
      desc: "Фильтруйте и находите промпты по категориям и ключевым словам.",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-12 w-12 mx-auto mb-3">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
        </svg>
      ),
      title: "Делитесь",
      desc: "Публикуйте промпты или делитесь ими с коллегами.",
    },
  ];

  const popularPrompts = [
    {
      title: "UX-Текст Переводчик",
      desc: "Адаптирует тексты под целевую аудиторию.",
    },
    {
      title: "Код-ревью бот",
      desc: "Проверяет JS-код и предлагает улучшения.",
    },
    {
      title: "Генератор описаний товаров",
      desc: "Создает SEO-оптимизированные описания.",
    },
  ];

  const movingCardsData = popularPrompts.map((item, idx) => ({
    id: idx,
    title: item.title,
    description: item.desc,
  }));

  return (
    <main className="max-w-7xl mx-auto px-6 py-16 space-y-20">
      <section className="text-center space-y-6 max-w-3xl mx-auto">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-5xl font-extrabold tracking-tight leading-tight">
          Менеджер промптов для продуктивной работы
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }} className="text-muted-foreground text-lg max-w-xl mx-auto">
          Храните, редактируйте и делитесь своими AI-промптами в одном месте.
        </motion.p>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <div className="flex justify-center gap-6 mt-6">
            <Link href="/create">
              <Button size="lg" variant="default">
                Создать промпт
              </Button>
            </Link>
            <Link href="/prompts">
              <Button size="lg" variant="outline">
                Просмотреть
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold text-center mb-12">Как это работает?</h2>
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 max-w-5xl mx-auto">
          {howItWorks.map(({ icon, title, desc }) => (
            <motion.div key={title} whileHover={{ scale: 1.05 }} className="rounded-3xl border border-muted bg-background p-8 text-center shadow-md cursor-default select-none">
              <div className="text-primary">{icon}</div>
              <h3 className="mt-4 mb-2 text-xl font-semibold">{title}</h3>
              <p className="text-muted-foreground">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold text-center mb-12">Популярные промпты</h2>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 max-w-5xl mx-auto">
          {popularPrompts.map(({ title, desc }) => (
            <motion.article key={title} whileHover={{ scale: 1.03 }} className="rounded-2xl border border-muted bg-background p-6 text-center cursor-default shadow-sm select-none transition-colors hover:bg-muted/40">
              <h4 className="text-lg font-semibold mb-2">{title}</h4>
              <p className="text-muted-foreground text-sm">{desc}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold text-center mb-12">Непрерывный слайдер</h2>
        <InfiniteMovingCards cards={movingCardsData} />
      </section>

      <section className="max-w-4xl mx-auto text-center space-y-6">
        <h2 className="text-3xl font-semibold">Почему стоит использовать наш менеджер?</h2>
        <p className="text-muted-foreground text-lg">Удобный интерфейс, поддержка категорий и тегов, быстрый поиск и создание промптов — всё, что нужно для продуктивной работы с AI.</p>
        <Button size="lg" variant="default" className="mt-4">
          Попробовать сейчас
        </Button>
      </section>

      <section className="bg-primary/10 dark:bg-primary/20 rounded-3xl p-12 max-w-4xl mx-auto text-center space-y-6 shadow-lg">
        <h2 className="text-3xl font-extrabold text-primary">Начните создавать промпты уже сегодня</h2>
        <p className="text-primary/90 text-lg max-w-xl mx-auto">Регистрация и хранение ваших промптов никогда не было проще. Делитесь и улучшайте свои AI-запросы вместе с нами!</p>
        <Link href="/create">
          <Button size="lg" className="mt-2">
            Создать промпт
          </Button>
        </Link>
      </section>
    </main>
  );
}
