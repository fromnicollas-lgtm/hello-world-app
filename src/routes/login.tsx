import React, { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { toast } from "sonner";
import { ArrowLeft, Loader2, ShieldCheck, UserCheck } from "lucide-react";
import { z } from "zod";

const searchSchema = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute("/login")({
  validateSearch: (search) => searchSchema.parse(search),
  component: LoginPage,
});

function LoginPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const { signIn, isConfigured, user } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If already authenticated, redirect to destination or /app
  React.useEffect(() => {
    if (user) {
      navigate({ to: search.redirect || "/app" });
    }
  }, [user, navigate, search.redirect]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    setIsSubmitting(true);
    const { error } = await signIn(email, password);
    setIsSubmitting(false);

    if (error) {
      toast.error(error.message || "Erro ao realizar login.");
    } else {
      toast.success("Login realizado com sucesso!");
      navigate({ to: search.redirect || "/app" });
    }
  };

  // Helper for quick testing with different roles
  const handleQuickDemo = async (roleType: string) => {
    setIsSubmitting(true);
    const demoEmail = `${roleType}@minerva.edu.br`;
    const { error } = await signIn(demoEmail, "minerva123");
    setIsSubmitting(false);

    if (!error) {
      toast.success(`Sessão iniciada como ${roleType.toUpperCase()}`);
      navigate({ to: search.redirect || (roleType === "admin" ? "/admin" : "/app") });
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center items-center bg-background px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
          Voltar para a página inicial
        </Link>

        <Card className="border border-border/80 shadow-sm bg-card">
          <CardHeader className="space-y-2 text-center pb-6">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-foreground text-background font-bold text-sm">
              M
            </div>
            <CardTitle className="text-xl font-bold tracking-tight text-foreground uppercase">
              MINERVA EDUCAÇÃO
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Acesse sua conta para continuar seus estudos de alta performance.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-semibold text-foreground">
                  E-mail
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu.email@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  required
                  className="h-10 text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-xs font-semibold text-foreground">
                    Senha
                  </Label>
                  <Link
                    to="/forgot-password"
                    className="text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Esqueceu a senha?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isSubmitting}
                  required
                  className="h-10 text-sm"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-10 font-semibold bg-foreground text-background hover:bg-foreground/90 mt-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  "Entrar"
                )}
              </Button>
            </CardContent>
          </form>

          {/* Quick Demo Selector for fast evaluation across roles */}
          <div className="px-6 py-4 border-t border-border/40 bg-secondary/20 rounded-b-lg">
            <p className="text-[11px] font-semibold text-muted-foreground text-center mb-2.5 uppercase tracking-wider">
              Acesso Rápido de Demonstração
            </p>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-[11px] h-8 font-medium bg-background"
                onClick={() => handleQuickDemo("student")}
                disabled={isSubmitting}
              >
                <UserCheck className="mr-1 h-3 w-3" />
                Aluno
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-[11px] h-8 font-medium bg-background"
                onClick={() => handleQuickDemo("teacher")}
                disabled={isSubmitting}
              >
                Professor
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-[11px] h-8 font-medium bg-background"
                onClick={() => handleQuickDemo("admin")}
                disabled={isSubmitting}
              >
                <ShieldCheck className="mr-1 h-3 w-3" />
                Admin
              </Button>
            </div>
          </div>

          <CardFooter className="flex justify-center border-t border-border/40 py-4">
            <p className="text-xs text-muted-foreground">
              Não possui uma conta?{" "}
              <Link to="/register" className="font-semibold text-foreground hover:underline">
                Cadastre-se gratuitamente
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
