import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { RoleGuard } from "../../components/auth/RoleGuard";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { FileEdit, CheckSquare, Layers } from "lucide-react";

export const Route = createFileRoute("/editor/")({
  component: EditorDashboard,
});

function EditorDashboard() {
  return (
    <RoleGuard allowedRoles={["editor", "admin", "super_admin"]}>
      <EditorDashboardContent />
    </RoleGuard>
  );
}

function EditorDashboardContent() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex-1 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border/60 pb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Produção Editorial
                </span>
                <Badge variant="outline" className="text-[10px] uppercase font-semibold">
                  Editor de Conteúdo
                </Badge>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Painel Editorial
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Revisão e publicação de questões, simulados, módulos de cursos e apostilas em PDF.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Card className="border border-border/70 bg-card">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <CheckSquare className="h-4 w-4 text-foreground" />
                  <CardTitle className="text-sm font-semibold text-foreground">
                    Revisão de Questões
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground">
                Catalogação de enunciados, gabaritos, filtros de bancas e anos das provas militares.
              </CardContent>
            </Card>

            <Card className="border border-border/70 bg-card">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <FileEdit className="h-4 w-4 text-foreground" />
                  <CardTitle className="text-sm font-semibold text-foreground">
                    Apostilas & Materiais PDF
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground">
                Organização do acervo teórico com diagramação limpa e objetiva para os alunos.
              </CardContent>
            </Card>

            <Card className="border border-border/70 bg-card">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-foreground" />
                  <CardTitle className="text-sm font-semibold text-foreground">
                    Módulos & Cursos
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground">
                Estruturação e ordenação da grade curricular de cada um dos 8 concursos militares.
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
