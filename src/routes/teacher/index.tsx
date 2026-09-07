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
import { GraduationCap, BookOpen, Video, HelpCircle } from "lucide-react";

export const Route = createFileRoute("/teacher/")({
  component: TeacherDashboard,
});

function TeacherDashboard() {
  return (
    <RoleGuard allowedRoles={["teacher", "admin", "super_admin"]}>
      <TeacherDashboardContent />
    </RoleGuard>
  );
}

function TeacherDashboardContent() {
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
                  Portal do Docente
                </span>
                <Badge variant="outline" className="text-[10px] uppercase font-semibold">
                  Professor
                </Badge>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Painel do Professor
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Gestão de aulas, matérias, gravação de conteúdos e resolução de dúvidas.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Card className="border border-border/70 bg-card">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Video className="h-4 w-4 text-foreground" />
                  <CardTitle className="text-sm font-semibold text-foreground">
                    Videoaulas & Materiais
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground">
                Estrutura de upload de aulas e PDFs vinculados a módulos e concursos militares.
              </CardContent>
            </Card>

            <Card className="border border-border/70 bg-card">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-foreground" />
                  <CardTitle className="text-sm font-semibold text-foreground">
                    Banco de Questões & Resoluções
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground">
                Cadastro e validação de resoluções passo a passo com explicações didáticas.
              </CardContent>
            </Card>

            <Card className="border border-border/70 bg-card">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-foreground" />
                  <CardTitle className="text-sm font-semibold text-foreground">
                    Aulas ao Vivo (Lives)
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground">
                Módulo futuro de transmissão de revisões de véspera e resolução de provas
                anteriores.
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
