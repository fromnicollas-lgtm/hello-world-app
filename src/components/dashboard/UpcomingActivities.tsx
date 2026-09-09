import React from "react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { CalendarRange } from "lucide-react";
import { upcomingQuery } from "../../lib/dashboard.queries";
import { Widget, WidgetEmpty, WidgetError, WidgetSkeleton } from "./Widget";
import { Button } from "../ui/button";

export const UpcomingActivities: React.FC<{ userId: string }> = ({ userId }) => {
  const { data, isLoading, isError, refetch } = useQuery(upcomingQuery(userId));

  return (
    <Widget title="Próximas atividades" description="Planos e metas com prazo em aberto.">
      {isLoading ? (
        <WidgetSkeleton lines={3} />
      ) : isError ? (
        <WidgetError onRetry={() => void refetch()} />
      ) : !data || data.length === 0 ? (
        <WidgetEmpty
          title="Nenhuma atividade planejada."
          description="Monte seu plano de estudos para organizar a rotina."
          action={
            <Button asChild size="sm">
              <Link to="/app/planejamento">Planejar estudos</Link>
            </Button>
          }
        />
      ) : (
        <ul className="space-y-3">
          {data.map((item) => (
            <li
              key={item.id}
              className="flex items-start gap-3 rounded-xl border border-border/60 p-3"
            >
              <CalendarRange className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">{item.title}</p>
                <p className="text-xs text-muted-foreground">
                  <span className="uppercase tracking-wide">{item.kind}</span> · {item.when}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Widget>
  );
};
