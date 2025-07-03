import React from "react";

interface Prompt {
  id: string;
  title: string;
  category?: string;
  favorite?: boolean;
}

interface Props {
  prompts: Prompt[];
  onEdit: (id: string) => void;
  noPromptsMessage?: string;
}

export default function PromptList({ prompts, onEdit, noPromptsMessage }: Props) {
  if (prompts.length === 0) {
    return <p className="text-muted-foreground text-sm">{noPromptsMessage || "Промптов нет."}</p>;
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {prompts.map(({ id, title, category, favorite }) => (
        <li key={id} className="rounded-xl border bg-background p-4 shadow hover:shadow-lg transition flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold truncate">{title}</h3>
            {category && <span className="mt-1 inline-block text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">{category}</span>}
            {favorite && (
              <span className="text-yellow-400 ml-2 text-sm" title="Избранное">
                ★
              </span>
            )}
          </div>
          <div className="mt-4">
            <button type="button" onClick={() => onEdit(id)} className="inline-block text-sm text-blue-600 hover:underline">
              ✏️ Редактировать
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
