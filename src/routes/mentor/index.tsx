import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { RoleGuard } from "../../components/auth/RoleGuard";
import { useAuth } from "../../hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Users, Target, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/mentor/")({
  component: MentorDashboard,
});

function MentorDashboard() {
  return (
    <RoleGuard allowedRoles={["mentor", "admin", "super_admin"]}>
      <MentorDashboardContent />
    </RoleGuard>
  );
}

function MentorDashboardContent() {
  const { profile } = useAuth();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex-1 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border/60 pb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Alta Performance
                </span>
                <Badge variant="outline" className="text-[10px] uppercase font-semibold">
                  Mentor
                </Badge>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Painel do Mentor
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Acompanhamento individual e em grupo dos alunos em preparação para concursos
                militares.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Card className="border border-border/70 bg-card">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-foreground" />
                  <CardTitle className="text-sm font-semibold text-foreground">
                    Alunos Mentorados
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground">
                Isolamento via RLS para que mentores acessem exclusivamente os alunos vinculados ao
                seu grupo.
              </CardContent>
            </Card>

            <Card className="border border-border/70 bg-card">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-foreground" />
                  <CardTitle className="text-sm font-semibold text-foreground">
                    Metas & Diagnósticos
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground">
                Estrutura de metas de minutos, rendimento em simulados e planos táticos de estudo.
              </CardContent>
            </Card>

            <Card className="border border-border/70 bg-card">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-foreground" />
                  <CardTitle className="text-sm font-semibold text-foreground">
                    Revisões Estratégicas
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground">
                Mapeamento das matérias de maior peso e menor rendimento de cada aluno.
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
