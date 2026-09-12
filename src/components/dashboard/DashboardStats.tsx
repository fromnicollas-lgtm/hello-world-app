import React from "react";
import { Link } from "@tanstack/react-router";
import { Clock, Flame, ListChecks, Target } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { formatMinutes, questionStatsQuery, studySessionsQuery } from "../../lib/dashboard.queries";
import { Skeleton } from "../ui/skeleton";
import { cn } from "../../lib/utils";

interface StatProps {
  label: string;
  value: string;
  hint: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  loading?: boolean;
  error?: boolean;
}

const Stat: React.FC<StatProps> = ({ label, value, hint, icon: Icon, href, loading, error }) => {
  const content = (
    <div
      className={cn(
        "surface-card animate-rise relative h-full overflow-hidden rounded-2xl p-4",
        href && "card-lift",
      )}
    >
      <span aria-hidden className="aura -top-14 -right-10 h-28 w-28 opacity-25" />
      <div className="relative flex items-center justify-between">
        <span className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
          {label}
        </span>
        <span className="grid h-7 w-7 place-items-center rounded-md border border-primary/25 bg-primary/12 text-primary-soft">
          <Icon className="h-3.5 w-3.5" />
        </span>
      </div>
      {loading ? (
        <Skeleton className="mt-3 h-7 w-20" />
      ) : (
        <p className="font-heading relative mt-2 text-2xl font-bold tracking-tight text-foreground tabular-nums">
          {error ? "--" : value}
        </p>
      )}
      <p className="relative mt-1 text-xs text-muted-foreground">
        {error ? "Dados indisponíveis" : hint}
      </p>
    </div>
  );

  return href ? (
    <Link to={href} className="block h-full">
      {content}
    </Link>
  ) : (
    content
  );
};

export const DashboardStats: React.FC<{ userId: string }> = ({ userId }) => {
  const sessions = useQuery(studySessionsQuery(userId));
  const questions = useQuery(questionStatsQuery(userId));

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <Stat
        label="Horas na semana"
        value={sessions.data ? formatMinutes(sessions.data.minutesWeek) : "0min"}
        hint={
          sessions.data?.hasSessions
            ? `Hoje: ${formatMinutes(sessions.data.minutesToday)}`
            : "Nenhuma sessão registrada"
        }
        icon={Clock}
        loading={sessions.isLoading}
        error={sessions.isError}
      />
      <Stat
        label="Questões"
        value={questions.data ? String(questions.data.total) : "0"}
        hint={
          questions.data && questions.data.total > 0
            ? `${questions.data.correct} corretas`
            : "Você ainda não resolveu questões"
        }
        icon={ListChecks}
        href="/app/questoes"
        loading={questions.isLoading}
        error={questions.isError}
      />
      <Stat
        label="Taxa de acerto"
        value={questions.data?.accuracy !== null && questions.data ? `${questions.data.accuracy}%` : "--"}
        hint={questions.data?.accuracy === null ? "Sem dados ainda" : "Considerando todas as respostas"}
        icon={Target}
        loading={questions.isLoading}
        error={questions.isError}
      />
      <Stat
        label="Sequência"
        value={sessions.data ? `${sessions.data.streak} ${sessions.data.streak === 1 ? "dia" : "dias"}` : "0 dias"}
        hint={
          sessions.data && sessions.data.streak > 0
            ? "Continue amanhã para manter o ritmo"
            : "Comece sua sequência hoje"
        }
        icon={Flame}
        loading={sessions.isLoading}
        error={sessions.isError}
      />
    </div>
  );
};
