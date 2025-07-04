"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TeamMember } from "./components/team-member/team-member";
import { SiNextdotjs, SiTypescript, SiFirebase, SiTailwindcss, SiVercel, SiOpenai } from "react-icons/si";
import { TechCard } from "./components/tech-card/tech-card";

export default function AboutPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12 space-y-32">
      <section className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-5xl font-bold tracking-tight">О Prompt Manager</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">Prompt Manager — это современный сервис для хранения, организации и совместного использования AI-промптов. Мы помогаем пользователям максимально эффективно использовать возможности искусственного интеллекта в повседневной работе и творчестве.</p>
          <Button variant="default" asChild>
            <Link href="/contact">Связаться с нами</Link>
          </Button>
        </div>
        <div className="md:w-1/2">
          <Image src="/images/about/company.jpg" alt="О компании" width={600} height={400} className="rounded-2xl shadow-lg object-cover" priority />
        </div>
      </section>

      <section className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
        <div className="md:w-1/2 order-2 md:order-1">
          <Image src="/images/about/mission.jpg" alt="Миссия" width={600} height={400} className="rounded-2xl shadow-lg object-cover" priority />
        </div>
        <div className="md:w-1/2 order-1 md:order-2 space-y-6">
          <h2 className="text-4xl font-semibold">Наша миссия</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">Сделать работу с AI-промптами удобной и прозрачной, чтобы каждый мог создавать качественные и полезные шаблоны, ускорять рабочие процессы и делиться знаниями в сообществе.</p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground text-base">
            <li>Простота и доступность для всех пользователей</li>
            <li>Безопасность и конфиденциальность данных</li>
            <li>Поддержка и развитие сообщества</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-4xl font-semibold text-center mb-12">Наша команда</h2>
        <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-3">
          <TeamMember name="Алексей" role="Frontend-разработчик" image="/team/alex.jpg" />
          <TeamMember name="Ольга" role="UX/UI дизайнер" image="/team/olga.jpg" />
          <TeamMember name="Иван" role="Backend-разработчик" image="/team/ivan.jpg" />
          <TeamMember name="Марина" role="Менеджер проекта" image="/team/marina.jpg" />
          <TeamMember name="Дмитрий" role="Специалист по AI" image="/team/dmitry.jpg" />
          <TeamMember name="Екатерина" role="Контент-менеджер" image="/team/ekaterina.jpg" />
        </div>
      </section>

      <section className="space-y-10">
        <h2 className="text-4xl font-semibold text-center mb-8">Технологии и инструменты</h2>
        <p className="max-w-3xl mx-auto text-center text-muted-foreground leading-relaxed mb-8">Мы используем современные технологии для создания быстрого, надежного и удобного сервиса:</p>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 max-w-4xl mx-auto">
          <TechCard name="Next.js" desc="Фреймворк React для SSR и статической генерации." icon={<SiNextdotjs className="w-6 h-6 text-black dark:text-white" />} />
          <TechCard name="TypeScript" desc="Статическая типизация для надежного кода." icon={<SiTypescript className="w-6 h-6 text-blue-600" />} />
          <TechCard name="Firebase" desc="Бэкенд и аутентификация." icon={<SiFirebase className="w-6 h-6 text-yellow-500" />} />
          <TechCard name="Tailwind CSS" desc="Удобная стилизация с утилитами." icon={<SiTailwindcss className="w-6 h-6 text-sky-500" />} />
          <TechCard name="Vercel" desc="Платформа для хостинга и деплоя." icon={<SiVercel className="w-6 h-6 text-black dark:text-white" />} />
          <TechCard name="OpenAI API" desc="Интеграция с искусственным интеллектом." icon={<SiOpenai className="w-6 h-6 text-gray-600 dark:text-gray-300" />} />
        </div>
      </section>

      <section className="text-center space-y-6">
        <h2 className="text-4xl font-semibold">Остались вопросы?</h2>
        <p className="max-w-xl mx-auto text-muted-foreground leading-relaxed">Пишите нам, и мы с радостью ответим на все вопросы, обсудим сотрудничество или примем ваши предложения.</p>
        <Button variant="default">Связаться с нами</Button>
      </section>
    </main>
  );
}
