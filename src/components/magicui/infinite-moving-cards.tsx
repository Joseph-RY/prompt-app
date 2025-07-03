"use client";

import React from "react";
import { motion } from "framer-motion";

interface Card {
  id: string | number;
  title: string;
  description?: string;
}

interface InfiniteMovingCardsProps {
  cards?: Card[];
  cardWidth?: number;
  speed?: number;
  height?: number | string;
}

export const InfiniteMovingCards: React.FC<InfiniteMovingCardsProps> = ({ cards = [], cardWidth = 280, speed = 50, height = 180 }) => {
  if (cards.length === 0) return null;

  const doubledCards = [...cards, ...cards];

  const totalWidth = cardWidth * doubledCards.length;
  const duration = totalWidth / speed;

  return (
    <section aria-label="Бесконечный слайдер карточек" className="relative overflow-hidden w-full" style={{ height }}>
      <motion.div
        className="flex space-x-4 will-change-transform"
        animate={{ x: [-totalWidth / 2, 0] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          duration,
        }}
        style={{ width: totalWidth }}
      >
        {doubledCards.map((card, i) => (
          <article key={`${card.id}-${i}`} className="flex-shrink-0 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md w-[280px] select-none" tabIndex={-1}>
            <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100">{card.title}</h3>
            {card.description && <p className="text-sm text-gray-600 dark:text-gray-400">{card.description}</p>}
          </article>
        ))}
      </motion.div>
    </section>
  );
};
