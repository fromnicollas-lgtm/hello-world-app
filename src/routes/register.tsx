import React, { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { toast } from "sonner";
import { ArrowLeft, CheckCircle2, Eye, EyeOff, Loader2, ShieldCheck, Check } from "lucide-react";

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
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    if (!termsAccepted) {
      toast.error("Você deve concordar com os Termos de Uso e Política de Privacidade.");
      return;
    }

    setIsSubmitting(true);
    const { error } = await signUp(fullName.trim(), email.trim(), password);
    setIsSubmitting(false);

    if (error) {
      toast.error(error.message || "Erro ao criar conta. Tente novamente.");
    } else {
      toast.success("Conta criada com sucesso! Papel de Aluno atribuído.");
      navigate({ to: "/app" });
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* ==================================================================== */}
      {/* LADO ESQUERDO: PAINEL INSTITUCIONAL VISUAL (Desktop)                  */}
      {/* ==================================================================== */}
      <div className="hidden lg:flex lg:w-1/2 bg-neutral-950 text-white flex-col justify-between p-12 lg:p-16 relative overflow-hidden">
        <div className="relative z-10">
          <Link to="/" className="inline-block">
            <img
              src="/logo-dark.png"
              alt="Minerva Educação"
              className="h-10 w-auto object-contain"
            />
          </Link>
        </div>

        <div className="relative z-10 max-w-lg space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/80 px-3.5 py-1 text-[11px] font-semibold tracking-wider uppercase text-neutral-300">
            <span>NOVO CADASTRO</span>
          </div>

          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-white">
            Construa sua aprovação com rigor e método.
          </h1>

          <p className="text-sm text-neutral-400 leading-relaxed font-normal">
            Junte-se à plataforma que une tecnologia e metodologia focada nos concursos militares
            mais disputados do Brasil.
          </p>

          <div className="space-y-3 pt-2 text-xs text-neutral-300">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-white shrink-0" />
              <span>Acesso imediato às ferramentas acadêmicas</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-white shrink-0" />
              <span>Perfil de estudante ativo automaticamente no cadastro</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-white shrink-0" />
              <span>Simulados inéditos com cronômetro e ranking</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-[11px] text-neutral-500">
          &copy; {new Date().getFullYear()} Minerva Educação. Todos os direitos reservados.
        </div>
      </div>

      {/* ==================================================================== */}
      {/* LADO DIREITO: FORMULÁRIO DE CADASTRO (Desktop e Mobile)              */}
      {/* ==================================================================== */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-12">
        <div className="w-full max-w-md mx-auto space-y-7">
          <Link
            to="/"
            className="inline-flex items-center text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
            Voltar para o site principal
          </Link>

          <div className="lg:hidden text-center pb-2">
            <Link to="/" className="inline-block">
              <img
                src="/logo.png"
                alt="Minerva Educação"
                className="h-9 w-auto mx-auto object-contain"
              />
            </Link>
          </div>

          <div className="space-y-1.5 text-left">
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              Comece sua preparação.
            </h2>
            <p className="text-xs text-muted-foreground">
              Crie sua conta para ingressar no ecossistema da Minerva Educação.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="fullName" className="text-xs font-bold text-foreground">
                Nome completo
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Ex: Nicollas Souza"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={isSubmitting}
                required
                className="h-11 text-sm bg-white border-border/80 focus:border-foreground"
              />
            </div>

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

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs font-bold text-foreground">
                Senha (mínimo de 6 caracteres)
              </Label>
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

            <div className="space-y-1.5">
              <Label htmlFor="confirmPassword" className="text-xs font-bold text-foreground">
                Confirmar senha
              </Label>
              <Input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isSubmitting}
                required
                className="h-11 text-sm bg-white border-border/80 focus:border-foreground"
              />
            </div>

            <div className="flex items-start space-x-2 pt-2">
              <Checkbox
                id="terms"
                checked={termsAccepted}
                onCheckedChange={(checked) => setTermsAccepted(Boolean(checked))}
                className="mt-0.5"
              />
              <label
                htmlFor="terms"
                className="text-xs font-medium text-muted-foreground cursor-pointer leading-snug"
              >
                Concordo com os Termos de Uso e Política de Privacidade.
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
                  Criando conta...
                </>
              ) : (
                "Criar minha conta"
              )}
            </Button>
          </form>

          <div className="border-t border-border/50 pt-5 text-center">
            <p className="text-xs text-muted-foreground">
              Já tenho uma conta?{" "}
              <Link to="/login" className="font-bold text-foreground hover:underline">
                Fazer login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
