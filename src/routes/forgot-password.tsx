import React, { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent } from "../components/ui/card";
import { toast } from "sonner";
import { ArrowLeft, CheckCircle2, Loader2, KeyRound } from "lucide-react";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Informe o e-mail da sua conta.");
      return;
    }

    setIsSubmitting(true);
    const { error } = await resetPassword(email.trim());
    setIsSubmitting(false);

    if (error) {
      toast.error(error.message || "Erro ao enviar instruções de recuperação.");
    } else {
      setIsSubmitted(true);
      toast.success("Instruções enviadas para seu e-mail!");
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center items-center bg-white px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* Voltar ao Login */}
        <Link
          to="/login"
          className="inline-flex items-center text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
          Voltar para o login
        </Link>

        {/* Card Principal */}
        <Card className="border border-border/80 shadow-sm bg-white rounded-2xl">
          <CardContent className="p-8 space-y-6">
            {/* Logo Oficial */}
            <div className="text-center">
              <Link to="/" className="inline-block">
                <img
                  src="/logo.png"
                  alt="Minerva Educação"
                  className="h-9 w-auto mx-auto object-contain"
                />
              </Link>
            </div>

            {/* Título & Descrição */}
            <div className="text-center space-y-1.5">
              <h1 className="text-xl font-extrabold tracking-tight text-foreground">
                Recuperação de Acesso
              </h1>
              <p className="text-xs text-muted-foreground max-w-xs mx-auto leading-relaxed">
                Digite seu e-mail cadastrado para receber o link seguro de redefinição de senha.
              </p>
            </div>

            {isSubmitted ? (
              <div className="space-y-5 text-center py-2">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-foreground">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-foreground">
                    Verifique sua caixa de entrada
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Enviamos as orientações de redefinição para{" "}
                    <strong className="text-foreground">{email}</strong>.
                  </p>
                </div>
                <Button
                  asChild
                  className="w-full h-11 text-xs font-semibold uppercase tracking-wider bg-foreground text-background hover:bg-foreground/90 rounded-lg shadow-xs"
                >
                  <Link to="/login">Voltar ao Login</Link>
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs font-bold text-foreground">
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
                    className="h-11 text-sm bg-white border-border/80 focus:border-foreground"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 font-semibold text-xs uppercase tracking-wider bg-foreground text-background hover:bg-foreground/90 transition-all mt-2 rounded-lg shadow-xs"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando instruções...
                    </>
                  ) : (
                    "Enviar link de recuperação"
                  )}
                </Button>
              </form>
            )}

            <div className="border-t border-border/40 pt-4 text-center">
              <Link
                to="/login"
                className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                Lembrou sua senha? Acessar conta
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
