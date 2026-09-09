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
        className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-secondary/50"
      >
        <Icon className="h-4 w-4 text-muted-foreground" />
        <span className="truncate">{label}</span>
      </Link>
    ))}
  </div>
);
