import React, { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
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
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";

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
    if (!email) {
      toast.error("Informe seu e-mail de cadastro.");
      return;
    }

    setIsSubmitting(true);
    const { error } = await resetPassword(email);
    setIsSubmitting(false);

    if (error) {
      toast.error(error.message || "Erro ao solicitar recuperação.");
    } else {
      setIsSubmitted(true);
      toast.success("Link de recuperação enviado para o seu e-mail.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center items-center bg-background px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <Link
          to="/login"
          className="inline-flex items-center text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
          Voltar para o login
        </Link>

        <Card className="border border-border/80 shadow-sm bg-card">
          <CardHeader className="space-y-2 text-center pb-6">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-foreground text-background font-bold text-sm">
              M
            </div>
            <CardTitle className="text-xl font-bold tracking-tight text-foreground uppercase">
              Recuperação de Senha
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Digite seu e-mail cadastrado para receber as instruções de redefinição.
            </CardDescription>
          </CardHeader>

          {isSubmitted ? (
            <CardContent className="space-y-4 text-center py-4">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-foreground">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">
                Verifique sua caixa de entrada
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Enviamos um link de recuperação para{" "}
                <strong className="text-foreground">{email}</strong>. Siga as orientações para
                redefinir sua senha com segurança.
              </p>
              <Button
                asChild
                className="w-full mt-4 bg-foreground text-background hover:bg-foreground/90 font-medium"
              >
                <Link to="/login">Voltar ao Login</Link>
              </Button>
            </CardContent>
          ) : (
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

                <Button
                  type="submit"
                  className="w-full h-10 font-semibold bg-foreground text-background hover:bg-foreground/90 mt-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    "Enviar link de recuperação"
                  )}
                </Button>
              </CardContent>
            </form>
          )}

          <CardFooter className="flex justify-center border-t border-border/40 py-4">
            <p className="text-xs text-muted-foreground">
              Lembrou sua senha?{" "}
              <Link to="/login" className="font-semibold text-foreground hover:underline">
                Acessar conta
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
