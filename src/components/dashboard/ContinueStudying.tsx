import React from "react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PlayCircle } from "lucide-react";
import { continueStudyingQuery } from "../../lib/dashboard.queries";
import { Widget, WidgetEmpty, WidgetError, WidgetSkeleton } from "./Widget";
import { Button } from "../ui/button";
import { ProgressBar } from "../app/PageShell";

export const ContinueStudying: React.FC<{ userId: string }> = ({ userId }) => {
  const { data, isLoading, isError, refetch } = useQuery(continueStudyingQuery(userId));

  return (
    <Widget title="Continuar estudando" description="Retome exatamente de onde você parou.">
      {isLoading ? (
        <WidgetSkeleton lines={4} />
      ) : isError ? (
        <WidgetError onRetry={() => void refetch()} />
      ) : !data?.hasEnrollment ? (
        <WidgetEmpty
          title="Você ainda não começou nenhum curso."
          description="Escolha um curso para iniciar sua trilha de preparação."
          action={
            <Button asChild size="sm">
              <Link to="/app/cursos">Explorar cursos</Link>
            </Button>
          }
        />
      ) : !data.lessonId ? (
        <WidgetEmpty
          title="Seu curso ainda não possui aulas publicadas."
          description={data.courseName ?? undefined}
          action={
            <Button asChild size="sm" variant="outline">
              <Link to="/app/cursos">Ver meus cursos</Link>
            </Button>
          }
        />
      ) : (
        <div className="space-y-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">
              {data.courseName}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{data.moduleName}</p>
            <p className="text-base font-semibold text-foreground">{data.lessonName}</p>
          </div>
          <ProgressBar
            value={data.progress}
            label={`${data.lessonsCompleted} de ${data.lessonsTotal} aulas concluídas`}
          />
          <Button asChild className="w-full sm:w-auto">
            <Link to="/app/cursos">
              <PlayCircle className="mr-2 h-4 w-4" />
              Continuar estudando
            </Link>
          </Button>
        </div>
      )}
    </Widget>
  );
};
