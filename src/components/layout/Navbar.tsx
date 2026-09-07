import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "@tanstack/react-router";
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
import { ShieldCheck, LogOut, LayoutDashboard, Menu, X, ArrowRight, BookOpen } from "lucide-react";

export const Navbar: React.FC = () => {
  const { user, profile, roles, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate({ to: "/" });
  };

  const navLinks = [
    { label: "Concursos", href: "/#concursos" },
    { label: "Cursos", href: "/#cursos" },
    { label: "Questões", href: "/#questoes" },
    { label: "Simulados", href: "/#simulados" },
    { label: "Mentorias", href: "/#mentorias" },
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
        className={`sticky top-0 z-50 w-full transition-all duration-200 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-b border-border/70 shadow-xs"
            : "bg-white border-b border-border/40"
        }`}
      >
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo Oficial à Esquerda */}
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src="/logo.png"
              alt="Minerva Educação"
              className="h-8 sm:h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </Link>

          {/* Links no Centro (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8 text-[13px] font-medium tracking-tight text-muted-foreground">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-foreground relative py-1"
              >
                {link.label}
              </a>
            ))}
            {user && (
              <Link
                to="/app"
                className="flex items-center gap-1.5 text-foreground font-semibold hover:text-foreground/80 transition-colors"
              >
                <BookOpen className="h-3.5 w-3.5" />
                Área do Aluno
              </Link>
            )}
            {isAdmin() && (
              <Link
                to="/admin"
                className="flex items-center gap-1.5 text-foreground font-semibold hover:text-foreground/80 transition-colors"
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                Admin
              </Link>
            )}
          </nav>

          {/* Ações à Direita (Desktop) */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full ring-1 ring-border/80 hover:ring-border p-0 cursor-pointer"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src={profile?.avatar_url || ""}
                        alt={profile?.full_name || "Usuário"}
                      />
                      <AvatarFallback className="bg-secondary text-secondary-foreground font-semibold text-xs">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-semibold leading-none text-foreground">
                        {profile?.full_name || "Aluno Minerva"}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground truncate">
                        {user.email}
                      </p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {roles.map((r) => (
                          <span
                            key={r}
                            className="inline-flex items-center rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-secondary-foreground uppercase tracking-wide"
                          >
                            {r}
                          </span>
                        ))}
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/app" className="cursor-pointer flex items-center gap-2">
                      <LayoutDashboard className="h-4 w-4" />
                      <span>Área do Aluno</span>
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin() && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="cursor-pointer flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4" />
                        <span>Painel Administrativo</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="cursor-pointer text-destructive focus:text-destructive flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sair da Plataforma</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2.5">
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="text-[13px] font-medium text-foreground hover:bg-secondary/60 h-9 px-4"
                >
                  <Link to="/login">Entrar</Link>
                </Button>
                <Button
                  size="sm"
                  asChild
                  className="bg-foreground text-background hover:bg-foreground/90 text-[13px] font-medium h-9 px-4.5 rounded-lg shadow-xs transition-all"
                >
                  <Link to="/register">
                    Começar agora
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            )}
          </div>

          {/* Botão Hamburger (Mobile) */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-foreground hover:bg-secondary/60 transition-colors focus:outline-none"
              aria-label="Abrir menu de navegação"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Menu Mobile Retrátil */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-border/60 bg-white px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top-2 duration-150">
            <div className="flex flex-col space-y-3 pt-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-foreground/80 hover:text-foreground py-2 border-b border-border/30"
                >
                  {link.label}
                </a>
              ))}
              {user && (
                <Link
                  to="/app"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-semibold text-foreground py-2 border-b border-border/30 flex items-center justify-between"
                >
                  <span>Área do Aluno</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              {user ? (
                <Button
                  variant="outline"
                  onClick={() => {
                    handleSignOut();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-xs font-semibold justify-center text-destructive border-destructive/30"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair da Conta
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    asChild
                    className="w-full text-xs font-semibold justify-center h-10"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link to="/login">Entrar</Link>
                  </Button>
                  <Button
                    asChild
                    className="w-full text-xs font-semibold justify-center bg-foreground text-background hover:bg-foreground/90 h-10"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link to="/register">Começar agora</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
