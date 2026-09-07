import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { RoleGuard } from "../../components/auth/RoleGuard";
import { useAuth } from "../../hooks/useAuth";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { BookOpen, Calendar, CheckSquare, GraduationCap, Trophy, PlayCircle } from "lucide-react";

export const Route = createFileRoute("/app/")({
  component: StudentDashboard,
});

function StudentDashboard() {
  return (
    <RoleGuard allowedRoles={["student", "admin", "super_admin"]}>
      <StudentDashboardContent />
    </RoleGuard>
  );
}

function StudentDashboardContent() {
  const { user, profile, roles } = useAuth();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex-1 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border/60 pb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Portal do Aluno
                </span>
                <Badge variant="outline" className="text-[10px] uppercase font-semibold">
                  {roles.join(", ")}
                </Badge>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Olá, {profile?.full_name || user?.email?.split("@")[0] || "Aluno"}
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Fundação acadêmica e preparação ativa para os concursos militares de alta
                performance.
              </p>
            </div>
          </div>

          {/* Quick Metrics / Modules Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border border-border/70 bg-card">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Concursos Disponíveis</p>
                  <p className="text-2xl font-bold text-foreground mt-1">8</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    AFA, EFOMM, EsPCEx e mais
                  </p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center text-foreground">
                  <GraduationCap className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border/70 bg-card">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Banco de Questões</p>
                  <p className="text-2xl font-bold text-foreground mt-1">Módulo 01</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Estrutura de dados pronta
                  </p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center text-foreground">
                  <CheckSquare className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border/70 bg-card">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Cronograma & Metas</p>
                  <p className="text-2xl font-bold text-foreground mt-1">Planejado</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Tabelas e RLS integrados
                  </p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center text-foreground">
                  <Calendar className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border/70 bg-card">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Gamificação</p>
                  <p className="text-2xl font-bold text-foreground mt-1">Nível 1</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Pontos e conquistas</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center text-foreground">
                  <Trophy className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Academic Modules Preparation */}
          <Card className="border border-border/70 bg-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-foreground" />
                <CardTitle className="text-base font-bold text-foreground">
                  Estrutura Acadêmica Conectada
                </CardTitle>
              </div>
              <CardDescription className="text-xs text-muted-foreground">
                Os módulos acadêmicos serão ativados progressivamente conforme o cronograma de 24
                prompts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="rounded-lg border border-border/60 p-4 space-y-2 bg-secondary/20">
                  <div className="flex items-center gap-2 font-semibold text-foreground">
                    <PlayCircle className="h-4 w-4" />
                    <span>Cursos & Videoaulas</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Tabelas de cursos, módulos, videoaulas e progresso de cada lição estruturadas no
                    PostgreSQL.
                  </p>
                </div>

                <div className="rounded-lg border border-border/60 p-4 space-y-2 bg-secondary/20">
                  <div className="flex items-center gap-2 font-semibold text-foreground">
                    <CheckSquare className="h-4 w-4" />
                    <span>Simulados & Tentativas</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Estrutura de exames, cronometragem, pontuação e estatísticas com proteção
                    estrita por usuário.
                  </p>
                </div>

                <div className="rounded-lg border border-border/60 p-4 space-y-2 bg-secondary/20">
                  <div className="flex items-center gap-2 font-semibold text-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Sessões & Metas de Estudo</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Registro de sessões, metas diárias de minutos e planos de estudo periódicos
                    preparados.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
