import React from "react";

interface TechCardProps {
  name: string;
  desc: string;
  icon?: React.ReactNode;
}

export const TechCard = ({ name, desc, icon }: TechCardProps) => {
  return (
    <div className="group rounded-2xl border border-muted bg-background p-6 shadow-md hover:shadow-xl transition hover:-translate-y-1">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-muted text-muted-foreground text-2xl">{icon || name[0]}</div>
        <h3 className="text-lg font-semibold text-foreground">{name}</h3>
      </div>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </div>
  );
};
