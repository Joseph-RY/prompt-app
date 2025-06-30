"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <section className="text-center space-y-4 mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Менеджер промптов для продуктивной работы</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">Храните, редактируйте и делитесь своими AI-промптами в одном месте.</p>
        <div className="flex justify-center gap-4">
          <Link href="/prompts/create">
            <Button variant="default">Создать промпт</Button>
          </Link>
          <Link href="/prompts">
            <Button variant="outline">Просмотреть</Button>
          </Link>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-center mb-8">Как это работает?</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {[
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25" />
                </svg>
              ),
              title: "Сохраняйте",
              desc: "Добавляйте и редактируйте ваши любимые промпты.",
            },
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              ),
              title: "Ищите",
              desc: "Фильтруйте и находите промпты по категориям и ключевым словам.",
            },
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                </svg>
              ),
              title: "Делитесь",
              desc: "Публикуйте промпты или делитесь ими с коллегами.",
            },
          ].map((item) => (
            <div key={item.title} className="flex items-center flex-col rounded-2xl border border-muted bg-background p-6 text-center shadow hover:shadow-lg transition hover:scale-[1.02]">
              <div className="text-4xl mb-3">{item.icon}</div>
              <h4 className="text-lg font-semibold mb-1">{item.title}</h4>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-center mb-8">Популярные промпты</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {[
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
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-muted bg-background p-6 text-center hover:bg-muted/40 transition">
              <h4 className="text-lg font-semibold mb-1">{item.title}</h4>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
