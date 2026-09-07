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
import { ArrowLeft, Check, Loader2 } from "lucide-react";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  const { signUp, user } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If already authenticated, redirect to /app
  React.useEffect(() => {
    if (user) {
      navigate({ to: "/app" });
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !email.trim() || !password) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    if (password.length < 6) {
      toast.error("A senha deve conter no mínimo 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("As senhas digitadas não coincidem.");
      return;
    }

    setIsSubmitting(true);
    const { error } = await signUp(fullName.trim(), email.trim(), password);
    setIsSubmitting(false);

    if (error) {
      toast.error(error.message || "Erro ao criar conta.");
    } else {
      toast.success("Conta criada com sucesso! Papel de Aluno atribuído.");
      navigate({ to: "/app" });
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
              Crie sua conta e inicie sua jornada de aprovação militar.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="fullName" className="text-xs font-semibold text-foreground">
                  Nome Completo
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Ex: Nicollas Souza"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={isSubmitting}
                  required
                  className="h-10 text-sm"
                />
              </div>

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
                <Label htmlFor="password" className="text-xs font-semibold text-foreground">
                  Senha (mínimo 6 caracteres)
                </Label>
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

              <div className="space-y-1.5">
                <Label htmlFor="confirmPassword" className="text-xs font-semibold text-foreground">
                  Confirmação de Senha
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isSubmitting}
                  required
                  className="h-10 text-sm"
                />
              </div>

              <div className="rounded-lg bg-secondary/40 p-3 text-[11px] text-muted-foreground space-y-1">
                <div className="flex items-center gap-1.5 text-foreground font-medium">
                  <Check className="h-3.5 w-3.5" />
                  Perfil inicial de Estudante ativo automaticamente
                </div>
                <p>O acesso a áreas administrativas e docentes é atribuído por gestores.</p>
              </div>

              <Button
                type="submit"
                className="w-full h-10 font-semibold bg-foreground text-background hover:bg-foreground/90 mt-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Criando conta...
                  </>
                ) : (
                  "Cadastrar"
                )}
              </Button>
            </CardContent>
          </form>

          <CardFooter className="flex justify-center border-t border-border/40 py-4">
            <p className="text-xs text-muted-foreground">
              Já possui uma conta?{" "}
              <Link to="/login" className="font-semibold text-foreground hover:underline">
                Fazer login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
