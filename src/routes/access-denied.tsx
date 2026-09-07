import React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { ShieldAlert, ArrowLeft, LogOut, Home } from "lucide-react";
import { z } from "zod";

const searchSchema = z.object({
  requiredRole: z.string().optional(),
});

export const Route = createFileRoute("/access-denied")({
  validateSearch: (search) => searchSchema.parse(search),
  component: AccessDeniedPage,
});

function AccessDeniedPage() {
  const search = Route.useSearch();
  const { user, roles, signOut } = useAuth();

  return (
    <div className="flex min-h-screen flex-col justify-center items-center bg-background px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <Card className="border border-destructive/20 shadow-sm bg-card text-center">
          <CardHeader className="space-y-3 pb-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <CardTitle className="text-xl font-bold tracking-tight text-foreground uppercase">
              Acesso Não Autorizado
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Você não possui as permissões necessárias para acessar este módulo.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {search.requiredRole && (
              <div className="rounded-lg bg-secondary/60 p-3 text-xs">
                <span className="text-muted-foreground">Permissão requerida: </span>
                <span className="font-semibold text-foreground uppercase">
                  {search.requiredRole}
                </span>
              </div>
            )}

            <div className="rounded-lg border border-border/60 p-3 text-xs text-left space-y-1.5">
              <p className="font-semibold text-foreground">Sua conta atual:</p>
              <p className="text-muted-foreground truncate">{user?.email || "Não autenticado"}</p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-muted-foreground text-[11px]">Papéis ativos:</span>
                {roles.length > 0 ? (
                  roles.map((r) => (
                    <span
                      key={r}
                      className="rounded bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-foreground uppercase"
                    >
                      {r}
                    </span>
                  ))
                ) : (
                  <span className="text-[10px] text-muted-foreground">Nenhum</span>
                )}
              </div>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              Caso acredite que se trata de um engano, solicite a alteração de seu perfil junto ao
              administrador do sistema ou à equipe de suporte.
            </p>
          </CardContent>

          <CardFooter className="flex flex-col gap-2 pt-2 pb-6">
            <div className="flex w-full gap-2">
              <Button variant="outline" className="w-1/2 text-xs font-medium" asChild>
                <Link to="/">
                  <Home className="mr-1.5 h-3.5 w-3.5" />
                  Início
                </Link>
              </Button>
              <Button
                className="w-1/2 text-xs font-medium bg-foreground text-background hover:bg-foreground/90"
                asChild
              >
                <Link to="/app">
                  <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
                  Área do Aluno
                </Link>
              </Button>
            </div>
            {user && (
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-xs text-muted-foreground hover:text-destructive"
                onClick={() => signOut()}
              >
                <LogOut className="mr-1.5 h-3.5 w-3.5" />
                Trocar de Conta
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
