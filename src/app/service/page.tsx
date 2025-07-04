"use client";

import { FaRocket, FaCogs, FaUsers, FaShieldAlt, FaMobileAlt, FaCloud, FaChartLine } from "react-icons/fa";
import { AiOutlineApi } from "react-icons/ai";
import { MdSupportAgent, MdOutlineIntegrationInstructions } from "react-icons/md";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ServicePage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-20 space-y-32">
      <section className="text-center max-w-4xl mx-auto space-y-5">
        <h1 className="text-5xl font-extrabold tracking-tight leading-tight">Наши сервисы для вашей максимальной продуктивности с AI</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">Мы предлагаем полный набор инструментов для удобного хранения, управления и совместного использования AI-промптов. Откройте новые возможности для работы и творчества.</p>
        <div className="mt-8 flex justify-center gap-6">
          <Link href="/prompts">
            <Button variant="default" className="px-8 py-3 text-lg">
              Попробовать сейчас
            </Button>
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-4xl font-semibold text-center mb-12">Основные сервисы Prompt Manager</h2>
        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          <div className="bg-background rounded-3xl p-10 shadow-lg border border-muted hover:shadow-2xl transition transform hover:scale-[1.04] cursor-pointer flex flex-col items-center text-center">
            <FaRocket className="text-6xl text-indigo-600 mb-6" />
            <h3 className="text-2xl font-semibold mb-4">Быстрый старт</h3>
            <p className="text-muted-foreground text-base leading-relaxed">Интуитивно понятный интерфейс позволяет создавать и сохранять промпты за считанные секунды.</p>
          </div>

          <div className="bg-background rounded-3xl p-10 shadow-lg border border-muted hover:shadow-2xl transition transform hover:scale-[1.04] cursor-pointer flex flex-col items-center text-center">
            <AiOutlineApi className="text-6xl text-green-600 mb-6" />
            <h3 className="text-2xl font-semibold mb-4">Интеграция API</h3>
            <p className="text-muted-foreground text-base leading-relaxed">Поддержка OpenAI и других AI-сервисов для автоматизации и расширения функционала.</p>
          </div>

          <div className="bg-background rounded-3xl p-10 shadow-lg border border-muted hover:shadow-2xl transition transform hover:scale-[1.04] cursor-pointer flex flex-col items-center text-center">
            <FaUsers className="text-6xl text-purple-600 mb-6" />
            <h3 className="text-2xl font-semibold mb-4">Совместная работа</h3>
            <p className="text-muted-foreground text-base leading-relaxed">Обменивайтесь промптами с коллегами и создавайте общие библиотеки шаблонов.</p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto space-y-16">
        <h2 className="text-4xl font-semibold text-center mb-12">Дополнительные возможности</h2>

        <div className="grid md:grid-cols-2 gap-14">
          <div className="flex items-start space-x-6">
            <FaShieldAlt className="text-indigo-600 text-5xl mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-1">Безопасность и конфиденциальность</h3>
              <p className="text-muted-foreground leading-relaxed">Надежное хранение данных и контроль доступа для защиты ваших промптов и информации.</p>
            </div>
          </div>

          <div className="flex items-start space-x-6">
            <MdOutlineIntegrationInstructions className="text-green-600 text-5xl mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-1">Легкая интеграция</h3>
              <p className="text-muted-foreground leading-relaxed">Простые в использовании API и webhooks для расширения возможностей и автоматизации процессов.</p>
            </div>
          </div>

          <div className="flex items-start space-x-6">
            <FaMobileAlt className="text-purple-600 text-5xl mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-1">Мобильная адаптивность</h3>
              <p className="text-muted-foreground leading-relaxed">Используйте Prompt Manager на любом устройстве — в офисе или в пути, ваш AI всегда с вами.</p>
            </div>
          </div>

          <div className="flex items-start space-x-6">
            <FaCloud className="text-indigo-600 text-5xl mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-1">Облачное хранение</h3>
              <p className="text-muted-foreground leading-relaxed">Все ваши промпты надежно сохранены в облаке с быстрым доступом и резервным копированием.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto text-center space-y-14">
        <h2 className="text-4xl font-semibold">Почему выбирают Prompt Manager?</h2>

        <div className="grid md:grid-cols-3 gap-12">
          <div className="border border-muted rounded-2xl p-8 bg-background shadow hover:shadow-lg transition cursor-default">
            <h3 className="text-xl font-semibold mb-3">Надежность</h3>
            <p className="text-muted-foreground leading-relaxed">Высокая доступность и безопасность данных для стабильной работы без сбоев.</p>
          </div>

          <div className="border border-muted rounded-2xl p-8 bg-background shadow hover:shadow-lg transition cursor-default">
            <h3 className="text-xl font-semibold mb-3">Поддержка 24/7</h3>
            <p className="text-muted-foreground leading-relaxed">Квалифицированная команда поддержки всегда готова помочь в любое время.</p>
          </div>

          <div className="border border-muted rounded-2xl p-8 bg-background shadow hover:shadow-lg transition cursor-default">
            <h3 className="text-xl font-semibold mb-3">Постоянное обновление</h3>
            <p className="text-muted-foreground leading-relaxed">Мы регулярно добавляем новые функции и следим за трендами AI-технологий.</p>
          </div>
        </div>
      </section>

      <section className="bg-indigo-600 rounded-3xl py-16 px-12 text-white text-center max-w-4xl mx-auto shadow-xl">
        <h2 className="text-4xl font-bold mb-4">Начните использовать Prompt Manager уже сегодня!</h2>
        <p className="text-lg max-w-3xl mx-auto mb-8">Создавайте, сохраняйте и делитесь промптами — вся сила AI в ваших руках.</p>
        <Link href="/register">
          <Button variant="default" className="px-10 py-5 text-xl font-semibold">
            Создать аккаунт
          </Button>
        </Link>
      </section>
    </main>
  );
}
