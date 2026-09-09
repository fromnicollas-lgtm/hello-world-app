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
        "h-full rounded-2xl border border-border bg-card p-4 transition-colors",
        href && "hover:border-primary/40",
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </span>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      {loading ? (
        <Skeleton className="mt-3 h-7 w-20" />
      ) : (
        <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground tabular-nums">
          {error ? "--" : value}
        </p>
      )}
      <p className="mt-1 text-xs text-muted-foreground">{error ? "Dados indisponíveis" : hint}</p>
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
