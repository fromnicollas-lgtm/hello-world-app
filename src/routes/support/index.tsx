import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { RoleGuard } from "../../components/auth/RoleGuard";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Headphones, MessageSquare, LifeBuoy } from "lucide-react";

export const Route = createFileRoute("/support/")({
  component: SupportDashboard,
});

function SupportDashboard() {
  return (
    <RoleGuard allowedRoles={["support", "admin", "super_admin"]}>
      <SupportDashboardContent />
    </RoleGuard>
  );
}

function SupportDashboardContent() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex-1 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border/60 pb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Atendimento & Aluno
                </span>
                <Badge variant="outline" className="text-[10px] uppercase font-semibold">
                  Suporte
                </Badge>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Central de Suporte
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Atendimento ao aluno, resolução de chamados técnicos e acompanhamento de matrículas.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Card className="border border-border/70 bg-card">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Headphones className="h-4 w-4 text-foreground" />
                  <CardTitle className="text-sm font-semibold text-foreground">
                    Chamados Técnicos
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground">
                Fila de atendimento de dúvidas de plataforma, acesso e liberação de conteúdo.
              </CardContent>
            </Card>

            <Card className="border border-border/70 bg-card">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-foreground" />
                  <CardTitle className="text-sm font-semibold text-foreground">
                    Notificações do Sistema
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground">
                Tabela de notificações integrada no PostgreSQL para alertas pontuais e comunicados.
              </CardContent>
            </Card>

            <Card className="border border-border/70 bg-card">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <LifeBuoy className="h-4 w-4 text-foreground" />
                  <CardTitle className="text-sm font-semibold text-foreground">
                    Status de Matrículas
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground">
                Verificação de assinaturas ativas e resolução de pendências de acesso a cursos.
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
