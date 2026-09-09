import React from "react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { questionStatsQuery } from "../../lib/dashboard.queries";
import { Widget, WidgetEmpty, WidgetError, WidgetSkeleton } from "./Widget";
import { Button } from "../ui/button";

export const PerformanceWidget: React.FC<{ userId: string }> = ({ userId }) => {
  const { data, isLoading, isError, refetch } = useQuery(questionStatsQuery(userId));

  const best = data?.bySubject.slice(0, 3) ?? [];
  const attention = data ? [...data.bySubject].reverse().slice(0, 3) : [];

  return (
    <Widget
      title="Desempenho"
      description="Resumo das suas respostas nos últimos 30 dias."
      action={
        <Button asChild variant="ghost" size="sm">
          <Link to="/app/desempenho">Ver meu desempenho</Link>
        </Button>
      }
    >
      {isLoading ? (
        <WidgetSkeleton lines={4} />
      ) : isError ? (
        <WidgetError
          message="Não foi possível carregar seu desempenho."
          onRetry={() => void refetch()}
        />
      ) : !data || data.total === 0 ? (
        <WidgetEmpty
          title="Resolva algumas questões para começar a acompanhar sua evolução."
          action={
            <Button asChild size="sm">
              <Link to="/app/questoes">Resolver questões</Link>
            </Button>
          }
        />
      ) : (
        <div className="space-y-6">
          <div className="flex flex-wrap items-baseline gap-x-8 gap-y-2">
            <div>
              <p className="text-3xl font-semibold tabular-nums text-foreground">
                {data.accuracy}%
              </p>
              <p className="text-xs text-muted-foreground">Taxa geral de acerto</p>
            </div>
            <div>
              <p className="text-3xl font-semibold tabular-nums text-foreground">{data.total}</p>
              <p className="text-xs text-muted-foreground">Questões respondidas</p>
            </div>
          </div>

          {data.recentTotal > 0 ? (
            <div className="h-36 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.evolution} margin={{ top: 4, right: 4, bottom: 0, left: -24 }}>
                  <defs>
                    <linearGradient id="accuracyFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="label"
                    tickLine={false}
                    axisLine={false}
                    fontSize={11}
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <YAxis
                    domain={[0, 100]}
                    tickLine={false}
                    axisLine={false}
                    fontSize={11}
                    stroke="hsl(var(--muted-foreground))"
                    width={40}
                  />
                  <Tooltip
                    cursor={{ stroke: "hsl(var(--border))" }}
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid hsl(var(--border))",
                      background: "hsl(var(--card))",
                      fontSize: 12,
                    }}
                    formatter={(value: number, _n, item) => [
                      `${value}% (${item?.payload?.total ?? 0} questões)`,
                      "Acerto",
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="accuracy"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fill="url(#accuracyFill)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">
              Resolva questões nos próximos dias para visualizar sua evolução.
            </p>
          )}

          {data.bySubject.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2">
              <SubjectList title="Melhor desempenho" items={best} />
              <SubjectList title="Precisam de atenção" items={attention} />
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">
              Seu desempenho por disciplina aparecerá aqui conforme você resolver questões.
            </p>
          )}
        </div>
      )}
    </Widget>
  );
};

const SubjectList: React.FC<{
  title: string;
  items: Array<{ subject: string; accuracy: number; total: number }>;
}> = ({ title, items }) => (
  <div>
    <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
      {title}
    </p>
    <ul className="mt-3 space-y-2">
      {items.map((item) => (
        <li key={item.subject} className="flex items-center justify-between gap-3 text-sm">
          <span className="truncate text-foreground">{item.subject}</span>
          <span className="tabular-nums text-muted-foreground">{item.accuracy}%</span>
        </li>
      ))}
    </ul>
  </div>
);
