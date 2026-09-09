import React from "react";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, Clock, ListChecks } from "lucide-react";
import { recentActivityQuery } from "../../lib/dashboard.queries";
import { Widget, WidgetEmpty, WidgetError, WidgetSkeleton } from "./Widget";

const icons = {
  aula: BookOpen,
  questao: ListChecks,
  estudo: Clock,
} as const;

export const RecentActivity: React.FC<{ userId: string }> = ({ userId }) => {
  const { data, isLoading, isError, refetch } = useQuery(recentActivityQuery(userId));

  return (
    <Widget title="Atividade recente" description="Últimos 30 dias de preparação.">
      {isLoading ? (
        <WidgetSkeleton lines={4} />
      ) : isError ? (
        <WidgetError onRetry={() => void refetch()} />
      ) : !data || data.length === 0 ? (
        <WidgetEmpty
          title="Nenhuma atividade registrada ainda."
          description="Assim que você estudar, resolver questões ou concluir aulas, seu histórico aparece aqui."
        />
      ) : (
        <ul className="space-y-3">
          {data.map((item) => {
            const Icon = icons[item.kind];
            return (
              <li key={item.id} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary text-muted-foreground">
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm text-foreground">{item.text}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(item.at).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </Widget>
  );
};
