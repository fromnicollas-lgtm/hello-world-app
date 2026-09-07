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
import { ShieldCheck, Users, Database, FileText, KeyRound, Server } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  return (
    <RoleGuard allowedRoles={["admin", "super_admin"]}>
      <AdminDashboardContent />
    </RoleGuard>
  );
}

function AdminDashboardContent() {
  const { user, profile, roles } = useAuth();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex-1 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border/60 pb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Painel de Controle
                </span>
                <Badge className="text-[10px] uppercase font-semibold bg-foreground text-background">
                  {roles.includes("super_admin") ? "Super Admin" : "Admin"}
                </Badge>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Administração Minerva Educação
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Gestão central de usuários, papéis, segurança RLS, concursos e monetização.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border border-border/70 bg-card">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <KeyRound className="h-4 w-4 text-foreground" />
                  <CardTitle className="text-sm font-semibold text-foreground">
                    Controle de Acesso (RBAC)
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground space-y-2">
                <p>
                  9 papéis configurados no PostgreSQL: student, teacher, mentor, influencer,
                  clipper, editor, support, admin e super_admin.
                </p>
                <p className="text-foreground font-medium">Permissões e RLS ativos no banco.</p>
              </CardContent>
            </Card>

            <Card className="border border-border/70 bg-card">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4 text-foreground" />
                  <CardTitle className="text-sm font-semibold text-foreground">
                    Estrutura de Dados
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground space-y-2">
                <p>
                  Tabelas de perfis, concursos, cursos, questões, simulados, assinaturas e
                  pagamentos prontas para operação.
                </p>
                <p className="text-foreground font-medium">
                  Script de migração em supabase/migrations/.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border/70 bg-card">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Server className="h-4 w-4 text-foreground" />
                  <CardTitle className="text-sm font-semibold text-foreground">
                    Segurança & RLS
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground space-y-2">
                <p>
                  Políticas de segurança ativas impedem que alunos ou terceiros acessem registros
                  protegidos.
                </p>
                <p className="text-foreground font-medium">
                  Validação de funções has_role() e is_admin().
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
