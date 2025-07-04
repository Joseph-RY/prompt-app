"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { InfiniteMovingCards } from "@/components/magicui/infinite-moving-cards";
import { motion } from "framer-motion";

import { FaRocket, FaSearch, FaShareAlt, FaStar, FaUsers, FaShieldAlt } from "react-icons/fa";

import { TypingAnimation } from "@/components/magicui/typing-animation";

export default function HomePage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-32">
      <section className="text-center max-w-4xl mx-auto space-y-8">
        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }} className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
          Менеджер промптов для продуктивной работы с AI
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.7 }} className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
          Храните, редактируйте и делитесь своими AI-промптами в одном мощном инструменте.
        </motion.p>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7, duration: 0.7 }} className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 mt-8">
          <Link href="/create">
            <Button size="lg" variant="default" className="px-8 sm:px-10 py-4 font-semibold tracking-wide shadow-lg hover:shadow-xl transition">
              Создать промпт
            </Button>
          </Link>
          <Link href="/prompts">
            <Button size="lg" variant="outline" className="px-8 sm:px-10 py-4 font-semibold tracking-wide">
              Просмотреть
            </Button>
          </Link>
        </motion.div>
      </section>

      <section className="max-w-[1440px] mx-auto space-y-14">
        <div className="h-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-14">
            <TypingAnimation>Как это работает?</TypingAnimation>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10">
          {[
            {
              icon: <FaRocket className="text-indigo-600 text-6xl sm:text-7xl mb-6" />,
              title: "Сохраняйте",
              text: "Добавляйте и редактируйте любимые AI-промпты быстро и удобно.",
            },
            {
              icon: <FaSearch className="text-green-600 text-6xl sm:text-7xl mb-6" />,
              title: "Ищите",
              text: "Мгновенный поиск и фильтрация по категориям и ключевым словам.",
            },
            {
              icon: <FaShareAlt className="text-purple-600 text-6xl sm:text-7xl mb-6" />,
              title: "Делитесь",
              text: "Публикуйте и обменивайтесь промптами с коллегами и друзьями.",
            },
          ].map(({ icon, title, text }, index) => (
            <motion.div key={index} whileHover={{ scale: 1.1 }} className="bg-background border border-muted rounded-3xl p-8 sm:p-10 text-center shadow-lg cursor-default select-none flex flex-col items-center">
              {icon}
              <h3 className="text-xl sm:text-2xl font-semibold mb-3">{title}</h3>
              <p className="text-muted-foreground max-w-xs leading-relaxed">{text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto space-y-10">
        <div className="h-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            <TypingAnimation>Популярные промпты</TypingAnimation>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {["UX-Текст Переводчик", "Код-ревью бот", "Генератор описаний товаров"].map((title, i) => (
            <motion.article key={i} whileHover={{ scale: 1.05 }} className="bg-background border border-muted rounded-2xl p-6 sm:p-8 shadow-md cursor-default select-none transition-colors hover:bg-muted/30">
              <h4 className="text-lg sm:text-xl font-semibold mb-3">{title}</h4>
              <p className="text-muted-foreground leading-relaxed">{i === 0 ? "Адаптирует тексты под целевую аудиторию быстро и качественно." : i === 1 ? "Проверяет JS-код и предлагает улучшения для качества." : "Создает SEO-оптимизированные описания для интернет-магазинов."}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto space-y-10">
        <div className="h-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-14">
            <TypingAnimation>Непрерывный слайдер</TypingAnimation>
          </h2>
        </div>
        <InfiniteMovingCards
          cards={[
            { id: 0, title: "UX-Текст Переводчик", description: "Адаптирует тексты под целевую аудиторию." },
            { id: 1, title: "Код-ревью бот", description: "Проверяет JS-код и предлагает улучшения." },
            { id: 2, title: "Генератор описаний товаров", description: "Создает SEO-оптимизированные описания." },
            { id: 3, title: "Автоматизация задач", description: "Сокращает рутинные операции и повышает эффективность." },
            { id: 4, title: "Мультиязычная поддержка", description: "Работайте с промптами на разных языках." },
          ]}
        />
      </section>

      <section className="max-w-[1440px] mx-auto  text-center space-y-12">
        <div className="h-20 mb-50 md:mb-0">
          <h2 className="text-3xl sm:text-4xl font-bold">
            <TypingAnimation>Почему стоит использовать Prompt Manager?</TypingAnimation>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {[
            {
              icon: <FaStar className="text-yellow-400 text-4xl sm:text-5xl mb-4 mx-auto" />,
              title: "Интуитивный интерфейс",
              text: "Простой и удобный дизайн, позволяющий быстро освоиться и работать с промптами.",
            },
            {
              icon: <FaUsers className="text-blue-500 text-4xl sm:text-5xl mb-4 mx-auto" />,
              title: "Командная работа",
              text: "Обменивайтесь промптами, сотрудничайте и создавайте общие проекты.",
            },
            {
              icon: <FaShieldAlt className="text-green-600 text-4xl sm:text-5xl mb-4 mx-auto" />,
              title: "Безопасность",
              text: "Ваши данные под надежной защитой с современными технологиями шифрования.",
            },
          ].map(({ icon, title, text }, i) => (
            <div key={i} className="bg-background rounded-3xl p-6 sm:p-8 shadow-md border border-muted cursor-default select-none hover:shadow-xl transition">
              {icon}
              <h3 className="text-lg sm:text-xl font-semibold mb-2">{title}</h3>
              <p className="text-muted-foreground leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-indigo-700 rounded-3xl py-16 sm:py-20 px-6 sm:px-12 text-white max-w-4xl mx-auto shadow-2xl text-center space-y-8">
        <h2 className="text-3xl sm:text-5xl font-extrabold leading-tight">Начните создавать промпты уже сегодня и повысите свою продуктивность!</h2>
        <p className="text-base sm:text-lg opacity-90">Регистрация и хранение промптов никогда не было проще. Делитесь, улучшайте и вдохновляйтесь вместе с Prompt Manager.</p>
        <Link href="/create">
          <Button size="lg" className="px-10 sm:px-12 py-4 font-semibold tracking-wide shadow-lg hover:shadow-xl transition">
            Создать промпт
          </Button>
        </Link>
      </section>
    </main>
  );
}
