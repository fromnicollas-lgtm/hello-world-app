import React, { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { Card, CardContent } from "../components/ui/card";
import { toast } from "sonner";
import {
  ArrowLeft,
  Loader2,
  Eye,
  EyeOff,
  CheckCircle2,
  ShieldCheck,
  UserCheck,
  Lock,
} from "lucide-react";
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
  const { signIn, user } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    if (user) {
      navigate({ to: search.redirect || "/app" });
    }
  }, [user, navigate, search.redirect]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Por favor, informe seu e-mail e senha.");
      return;
    }

    setIsSubmitting(true);
    const { error } = await signIn(email, password);
    setIsSubmitting(false);

    if (error) {
      toast.error(error.message || "Erro ao realizar login. Verifique suas credenciais.");
    } else {
      toast.success("Autenticação realizada com sucesso!");
      navigate({ to: search.redirect || "/app" });
    }
  };

  const handleQuickDemo = async (roleType: string) => {
    setIsSubmitting(true);
    const demoEmail = `${roleType}@minerva.edu.br`;
    const { error } = await signIn(demoEmail, "minerva123");
    setIsSubmitting(false);

    if (!error) {
      toast.success(`Sessão iniciada como perfil ${roleType.toUpperCase()}`);
      navigate({ to: search.redirect || (roleType === "admin" ? "/admin" : "/app") });
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* ==================================================================== */}
      {/* LADO ESQUERDO: PAINEL INSTITUCIONAL VISUAL (Desktop)                  */}
      {/* ==================================================================== */}
      <div className="hidden lg:flex lg:w-1/2 bg-neutral-950 text-white flex-col justify-between p-12 lg:p-16 relative overflow-hidden">
        {/* Logo Topo */}
        <div className="relative z-10">
          <Link to="/" className="inline-block">
            <img
              src="/logo-dark.png"
              alt="Minerva Educação"
              className="h-10 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Citação e Proposta de Valor */}
        <div className="relative z-10 max-w-lg space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/80 px-3.5 py-1 text-[11px] font-semibold tracking-wider uppercase text-neutral-300">
            <span>PREPARAÇÃO DE ALTO DESEMPENHO</span>
          </div>

          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-white">
            "Estude com estratégia. Evolua com dados."
          </h1>

          <p className="text-sm text-neutral-400 leading-relaxed font-normal">
            A plataforma construída para transformar sua dedicação aos concursos militares em
            aprovação concreta, com simulados calibrados, banco de questões classificado e
            diagnóstico contínuo.
          </p>

          <div className="space-y-3 pt-2 text-xs text-neutral-300">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-white shrink-0" />
              <span>AFA • EFOMM • EsPCEx • Escola Naval • ESA • EEAR</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-white shrink-0" />
              <span>Banco de questões com gabarito e resolução comentada</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-white shrink-0" />
              <span>Segurança e isolamento estrito de dados por usuário</span>
            </div>
          </div>
        </div>

        {/* Rodapé institucional */}
        <div className="relative z-10 text-[11px] text-neutral-500">
          &copy; {new Date().getFullYear()} Minerva Educação. Todos os direitos reservados.
        </div>
      </div>

      {/* ==================================================================== */}
      {/* LADO DIREITO: FORMULÁRIO DE LOGIN (Desktop e Mobile)                 */}
      {/* ==================================================================== */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-12">
        <div className="w-full max-w-md mx-auto space-y-7">
          {/* Voltar ao início */}
          <Link
            to="/"
            className="inline-flex items-center text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
            Voltar para o site principal
          </Link>

          {/* Logo no Mobile */}
          <div className="lg:hidden text-center pb-2">
            <Link to="/" className="inline-block">
              <img
                src="/logo.png"
                alt="Minerva Educação"
                className="h-9 w-auto mx-auto object-contain"
              />
            </Link>
          </div>

          {/* Título & Descrição */}
          <div className="space-y-1.5 text-left">
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              Acesse sua conta
            </h2>
            <p className="text-xs text-muted-foreground">
              Entre com suas credenciais para continuar sua rotina de estudos.
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-bold text-foreground">
                E-mail institucional ou pessoal
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

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-xs font-bold text-foreground">
                  Senha
                </Label>
                <Link
                  to="/forgot-password"
                  className="text-[11px] font-semibold text-muted-foreground hover:text-foreground transition-colors"
                >
                  Esqueci minha senha
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isSubmitting}
                  required
                  className="h-11 text-sm pr-10 bg-white border-border/80 focus:border-foreground"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
                  aria-label={showPassword ? "Ocultar senha" : "Exibir senha"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-1">
              <Checkbox
                id="rememberMe"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(Boolean(checked))}
              />
              <label
                htmlFor="rememberMe"
                className="text-xs font-medium text-muted-foreground cursor-pointer leading-none"
              >
                Lembrar minha sessão neste dispositivo
              </label>
            </div>

            <Button
              type="submit"
              className="w-full h-11 font-semibold text-xs uppercase tracking-wider bg-foreground text-background hover:bg-foreground/90 transition-all mt-3 rounded-lg shadow-xs"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Acessando plataforma...
                </>
              ) : (
                "Entrar"
              )}
            </Button>
          </form>

          {/* Atalhos Rápidos para Simulação de Perfis */}
          <div className="border-t border-border/50 pt-5 space-y-2">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider text-center">
              Acesso rápido para avaliação de papéis
            </p>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-[11px] h-8 font-semibold bg-white hover:bg-secondary/40"
                onClick={() => handleQuickDemo("student")}
                disabled={isSubmitting}
              >
                <UserCheck className="mr-1 h-3 w-3" />
                Aluno
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-[11px] h-8 font-semibold bg-white hover:bg-secondary/40"
                onClick={() => handleQuickDemo("teacher")}
                disabled={isSubmitting}
              >
                Professor
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-[11px] h-8 font-semibold bg-white hover:bg-secondary/40"
                onClick={() => handleQuickDemo("admin")}
                disabled={isSubmitting}
              >
                <ShieldCheck className="mr-1 h-3 w-3" />
                Admin
              </Button>
            </div>
          </div>

          {/* Criar Conta */}
          <div className="border-t border-border/50 pt-5 text-center">
            <p className="text-xs text-muted-foreground">
              Ainda não possui uma conta?{" "}
              <Link to="/register" className="font-bold text-foreground hover:underline">
                Criar conta gratuitamente
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
