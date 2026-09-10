import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../hooks/useAuth";
import { profileQuery } from "../../lib/dashboard.queries";
import { DashboardStats } from "../../components/dashboard/DashboardStats";
import { ContinueStudying } from "../../components/dashboard/ContinueStudying";
import { GoalsWidget } from "../../components/dashboard/GoalsWidget";
import { PerformanceWidget } from "../../components/dashboard/PerformanceWidget";
import { UpcomingActivities } from "../../components/dashboard/UpcomingActivities";
import { RecentActivity } from "../../components/dashboard/RecentActivity";
import { QuickActions } from "../../components/dashboard/QuickActions";
import { ObjectiveCard } from "../../components/dashboard/ObjectiveCard";
import { Skeleton } from "../../components/ui/skeleton";
import { Button } from "../../components/ui/button";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [
      { title: "Início | Portal do Aluno — Minerva Educação" },
      {
        name: "description",
        content: "Acompanhe sua preparação, metas e desempenho no portal da Minerva Educação.",
      },
      { property: "og:title", content: "Início | Portal do Aluno — Minerva Educação" },
      {
        property: "og:description",
        content: "Acompanhe sua preparação, metas e desempenho no portal da Minerva Educação.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StudentHome,
});

function StudentHome() {
  const { user } = useAuth();
  const userId = user?.id ?? "";
  const profile = useQuery({ ...profileQuery(userId), enabled: Boolean(userId) });

  if (!userId) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-56" />
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  const firstName = profile.data?.fullName?.trim().split(" ")[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          {profile.isLoading ? (
            <Skeleton className="h-8 w-52" />
          ) : (
            <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {firstName ? `Olá, ${firstName} 👋` : "Olá! 👋"}
            </h1>
          )}
          <p className="mt-1 text-sm text-muted-foreground">Vamos continuar sua preparação?</p>
        </div>
        <div className="lg:w-80">
          <ObjectiveCard userId={userId} />
        </div>
      </header>

      {/* Mobile: continuar estudando primeiro */}
      <div className="lg:hidden">
        <ContinueStudying userId={userId} />
      </div>

      {/* Resumo */}
      <DashboardStats userId={userId} />

      {/* Ações rápidas */}
      <QuickActions />

      {/* Desktop: continuar estudando + metas */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="hidden lg:col-span-2 lg:block">
          <ContinueStudying userId={userId} />
        </div>
        <div className="lg:col-span-1">
          <UpcomingActivities userId={userId} />
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2">
          <PerformanceWidget userId={userId} />
        </div>
        <div className="lg:col-span-1 lg:row-start-2">
          <GoalsWidget userId={userId} />
        </div>
      </div>

      <RecentActivity userId={userId} />

      <p className="text-center text-xs text-muted-foreground">
        Precisa de ajuda para começar?{" "}
        <Button asChild variant="link" className="h-auto p-0 text-xs">
          <Link to="/app/ajuda">Fale com a Minerva</Link>
        </Button>
      </p>
    </div>
  );
}
