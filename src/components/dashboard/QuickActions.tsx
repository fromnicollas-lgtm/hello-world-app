import React from "react";
import { Link } from "@tanstack/react-router";
import { BookOpen, CalendarRange, LineChart, ListChecks } from "lucide-react";

const actions = [
  { label: "Resolver questões", to: "/app/questoes", icon: ListChecks },
  { label: "Continuar curso", to: "/app/cursos", icon: BookOpen },
  { label: "Planejar estudos", to: "/app/planejamento", icon: CalendarRange },
  { label: "Ver desempenho", to: "/app/desempenho", icon: LineChart },
] as const;

export const QuickActions: React.FC = () => (
  <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
    {actions.map(({ label, to, icon: Icon }) => (
      <Link
        key={to}
        to={to}
        className="surface-card card-lift group flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm font-medium text-foreground"
      >
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-primary/25 bg-primary/12 text-primary-soft transition-colors group-hover:bg-primary/20">
          <Icon className="h-4 w-4" />
        </span>
        <span className="truncate">{label}</span>
      </Link>
    ))}
  </div>
);
