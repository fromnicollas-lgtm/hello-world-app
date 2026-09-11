import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  ShieldCheck,
  LogOut,
  LayoutDashboard,
  Menu,
  X,
  ArrowRight,
  BookOpen,
} from "lucide-react";

export const Navbar: React.FC = () => {
  const { user, profile, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevenir scroll do body quando menu mobile está aberto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const handleSignOut = async () => {
    await signOut();
    navigate({ to: "/" });
  };

  const navLinks = [
    { label: "Concursos", href: "/#concursos" },
    { label: "Plataforma", href: "/#plataforma" },
    { label: "Questões", href: "/#questoes-demo" },
    { label: "Desempenho", href: "/#desempenho" },
    { label: "Cronograma", href: "/#cronograma" },
    { label: "Planos", href: "/#planos" },
  ];

  const initials = profile?.full_name
    ? profile.full_name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : user?.email?.slice(0, 2).toUpperCase() || "ME";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-background/85 backdrop-blur-md border-b border-border shadow-lg shadow-black/20"
            : "bg-transparent border-b border-white/5"
        }`}
      >
        <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo Oficial à Esquerda */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none">
            <img
              src="/logo-dark.png"
              alt="Minerva Educação"
              className="h-8 sm:h-9 w-auto object-contain transition-opacity group-hover:opacity-90"
            />
          </Link>

          {/* Links no Centro (Desktop) - Estilo Moderno e Elegante */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-muted-foreground">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-foreground relative py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-card transition-all duration-200 group-hover:w-full rounded-full" />
              </a>
            ))}
            {user && (
              <Link
                to="/app"
                className="flex items-center gap-1.5 text-foreground font-semibold hover:text-foreground transition-colors"
              >
                <BookOpen className="h-4 w-4" />
                Área do Aluno
              </Link>
            )}
            {isAdmin() && (
              <Link
                to="/admin"
                className="flex items-center gap-1.5 text-foreground font-semibold hover:text-foreground transition-colors"
              >
                <ShieldCheck className="h-4 w-4" />
                Admin
              </Link>
            )}
          </nav>

          {/* Ações à Direita (Desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2.5 border border-border bg-card/80 px-3 py-1.5 rounded-lg hover:border-primary/50 transition-colors cursor-pointer">
                    <Avatar className="h-7 w-7 rounded-full ring-1 ring-primary/40">
                      <AvatarImage
                        src={profile?.avatar_url || ""}
                        alt={profile?.full_name || "Usuário"}
                      />
                      <AvatarFallback className="bg-secondary text-foreground font-bold text-xs">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-foreground text-xs font-medium">
                      {profile?.full_name?.split(" ")[0] || "Aluno"}
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 bg-card border-border text-foreground rounded-xl p-1.5 shadow-xl"
                  align="end"
                >
                  <DropdownMenuLabel className="font-normal px-2.5 py-2">
                    <div className="flex flex-col space-y-0.5">
                      <p className="text-xs font-bold text-foreground">
                        {profile?.full_name || "Aluno Minerva"}
                      </p>
                      <p className="text-[11px] text-muted-foreground truncate">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-secondary" />
                  <DropdownMenuItem asChild className="rounded-lg focus:bg-secondary focus:text-foreground">
                    <Link to="/app" className="cursor-pointer flex items-center gap-2 text-xs py-2">
                      <LayoutDashboard className="h-4 w-4" />
                      <span>Área do Aluno</span>
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin() && (
                    <DropdownMenuItem asChild className="rounded-lg focus:bg-secondary focus:text-foreground">
                      <Link to="/admin" className="cursor-pointer flex items-center gap-2 text-xs py-2">
                        <ShieldCheck className="h-4 w-4" />
                        <span>Painel Admin</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator className="bg-secondary" />
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="cursor-pointer text-red-400 focus:text-red-300 focus:bg-secondary flex items-center gap-2 text-xs py-2 rounded-lg"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Encerrar sessão</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-3 text-sm">
                <Link
                  to="/login"
                  className="text-muted-foreground hover:text-foreground transition-colors px-3 py-2 font-medium"
                >
                  Entrar
                </Link>
                <Button
                  size="sm"
                  asChild
                  className="h-10 px-5 bg-gradient-primary text-primary-foreground hover:opacity-90 minerva-glow-strong font-semibold text-xs rounded-lg shadow-md shadow-primary/5 transition-all cursor-pointer"
                >
                  <Link to="/register">
                    <span>Começar agora</span>
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            )}
          </div>

          {/* Botão Hamburger & Ação Rápida Mobile */}
          <div className="flex lg:hidden items-center gap-2.5">
            {!user && (
              <Link
                to="/login"
                className="text-xs font-medium text-muted-foreground hover:text-foreground px-2.5 py-1.5 rounded-md border border-border bg-card/60"
              >
                Entrar
              </Link>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg border border-border bg-card/90 text-foreground hover:bg-secondary transition-colors focus:outline-none cursor-pointer flex items-center justify-center min-h-[44px] min-w-[44px]"
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Menu Mobile - Drawer com Backdrop Blur e Animação Fluida */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden flex flex-col justify-between bg-background/98 backdrop-blur-xl pt-20 pb-8 px-6 overflow-y-auto animate-in fade-in duration-200">
          <div className="flex flex-col space-y-1 pt-4">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Navegação
            </p>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-base font-medium text-foreground hover:text-foreground py-3 border-b border-border min-h-[48px]"
              >
                <span>{link.label}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </a>
            ))}

            {user && (
              <Link
                to="/app"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-base font-semibold text-foreground py-3.5 border-b border-border"
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-foreground" />
                  <span>Área do Aluno</span>
                </div>
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}

            {isAdmin() && (
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-base font-semibold text-foreground py-3.5 border-b border-border"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-foreground" />
                  <span>Painel Admin</span>
                </div>
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>

          <div className="pt-6 space-y-3">
            {user ? (
              <Button
                variant="outline"
                onClick={() => {
                  handleSignOut();
                  setMobileMenuOpen(false);
                }}
                className="w-full h-12 text-sm font-semibold justify-center text-red-400 border-red-500/30 bg-card/80 rounded-xl"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Encerrar sessão
              </Button>
            ) : (
              <div className="flex flex-col gap-2.5">
                <Button
                  size="lg"
                  asChild
                  className="w-full h-12 text-sm font-bold bg-gradient-primary text-primary-foreground hover:opacity-90 minerva-glow-strong rounded-xl shadow-lg"
                >
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                    <span>Começar agora</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full h-11 flex items-center justify-center rounded-xl border border-border text-muted-foreground font-medium text-sm hover:bg-secondary"
                >
                  Já tenho conta (Login)
                </Link>
              </div>
            )}

            <div className="pt-4 text-center">
              <p className="text-[11px] text-muted-foreground">
                Minerva Educação • Preparação Militar de Alta Performance
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
