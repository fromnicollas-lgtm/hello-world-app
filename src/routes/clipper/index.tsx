import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { RoleGuard } from "../../components/auth/RoleGuard";
import { useAuth } from "../../hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Scissors, Trophy, Film } from "lucide-react";

export const Route = createFileRoute("/clipper/")({
  component: ClipperDashboard,
});

function ClipperDashboard() {
  return (
    <RoleGuard allowedRoles={["clipper", "admin", "super_admin"]}>
      <ClipperDashboardContent />
    </RoleGuard>
  );
}

function ClipperDashboardContent() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex-1 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border/60 pb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Comunidade Criativa
                </span>
                <Badge variant="outline" className="text-[10px] uppercase font-semibold">
                  Clipador
                </Badge>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Painel do Clipador
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Envio de cortes de aulas e lives, moderação por pontos e ranking de criadores.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Card className="border border-border/70 bg-card">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Scissors className="h-4 w-4 text-foreground" />
                  <CardTitle className="text-sm font-semibold text-foreground">
                    Envios de Cortes
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground">
                Submissão de links de vídeos para revisão e aprovação pela equipe de moderação.
              </CardContent>
            </Card>

            <Card className="border border-border/70 bg-card">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-foreground" />
                  <CardTitle className="text-sm font-semibold text-foreground">
                    Pontuação & Recompensas
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground">
                Sistema de pontuação por visualizações e engajamento aprovado via banco de dados.
              </CardContent>
            </Card>

            <Card className="border border-border/70 bg-card">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Film className="h-4 w-4 text-foreground" />
                  <CardTitle className="text-sm font-semibold text-foreground">
                    Repositório de Aulas
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground">
                Acesso aos momentos mais relevantes e aulas liberadas para cortes virais.
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
