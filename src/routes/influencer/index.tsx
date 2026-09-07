import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { RoleGuard } from "../../components/auth/RoleGuard";
import { useAuth } from "../../hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { DollarSign, Link as LinkIcon, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/influencer/")({
  component: InfluencerDashboard,
});

function InfluencerDashboard() {
  return (
    <RoleGuard allowedRoles={["influencer", "admin", "super_admin"]}>
      <InfluencerDashboardContent />
    </RoleGuard>
  );
}

function InfluencerDashboardContent() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex-1 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border/60 pb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Parcerias & Divulgação
                </span>
                <Badge variant="outline" className="text-[10px] uppercase font-semibold">
                  Influencer / Afiliado
                </Badge>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Painel de Afiliados & Influenciadores
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Links de indicação, comissões, conversões e materiais promocionais oficiais da
                Minerva Educação.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Card className="border border-border/70 bg-card">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <LinkIcon className="h-4 w-4 text-foreground" />
                  <CardTitle className="text-sm font-semibold text-foreground">
                    Links de Indicação & Cupons
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground">
                Tabelas de códigos promocionais e links rastreados com comissão garantida no banco
                de dados.
              </CardContent>
            </Card>

            <Card className="border border-border/70 bg-card">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-foreground" />
                  <CardTitle className="text-sm font-semibold text-foreground">
                    Comissões & Pagamentos
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground">
                RLS estrito: o parceiro visualiza apenas suas próprias indicações e extrato
                financeiro.
              </CardContent>
            </Card>

            <Card className="border border-border/70 bg-card">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-foreground" />
                  <CardTitle className="text-sm font-semibold text-foreground">
                    Conversões em Tempo Real
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground">
                Estrutura de métricas analíticas e taxa de adesão aos cursos militares.
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
