import React from "react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { formatMinutes, goalsQuery } from "../../lib/dashboard.queries";
import { Widget, WidgetEmpty, WidgetError, WidgetSkeleton } from "./Widget";
import { Button } from "../ui/button";
import { ProgressBar } from "../app/PageShell";

export const GoalsWidget: React.FC<{ userId: string }> = ({ userId }) => {
  const { data, isLoading, isError, refetch } = useQuery(goalsQuery(userId));

  return (
    <Widget
      title="Metas"
      description="Progresso considerando as sessões desta semana."
      action={
        <Button asChild variant="ghost" size="sm">
          <Link to="/app/planejamento">Ver todas</Link>
        </Button>
      }
    >
      {isLoading ? (
        <WidgetSkeleton lines={3} />
      ) : isError ? (
        <WidgetError message="Não foi possível carregar suas metas." onRetry={() => void refetch()} />
      ) : !data || data.length === 0 ? (
        <WidgetEmpty
          title="Você ainda não possui uma meta."
          description="Defina um objetivo semanal para acompanhar sua constância."
          action={
            <Button asChild size="sm">
              <Link to="/app/planejamento">Criar meta</Link>
            </Button>
          }
        />
      ) : (
        <ul className="space-y-4">
          {data.map((goal) => (
            <li key={goal.id}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-sm font-medium text-foreground">{goal.title}</span>
                <span className="text-xs tabular-nums text-muted-foreground">
                  {formatMinutes(goal.minutesDone)} / {formatMinutes(goal.targetMinutes)}
                </span>
              </div>
              <ProgressBar
                value={goal.percent}
                label={
                  goal.deadline
                    ? `Prazo: ${new Date(goal.deadline).toLocaleDateString("pt-BR")}`
                    : "Sem prazo definido"
                }
                className="mt-2"
              />
            </li>
          ))}
        </ul>
      )}
    </Widget>
  );
};
