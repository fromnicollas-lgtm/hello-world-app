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
import { ShieldCheck, LogOut, LayoutDashboard, Menu, X, ArrowRight, BookOpen } from "lucide-react";

export const Navbar: React.FC = () => {
  const { user, profile, roles, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate({ to: "/" });
  };

  const navLinks = [
    { label: "CONCURSOS", href: "/#concursos" },
    { label: "PLATAFORMA", href: "/#plataforma" },
    { label: "QUESTÕES", href: "/#questoes" },
    { label: "DESEMPENHO", href: "/#desempenho" },
    { label: "CRONOGRAMA", href: "/#planejamento" },
    { label: "PLANOS", href: "/#planos" },
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-neutral-950/90 backdrop-blur-md border-b border-neutral-850 shadow-xl"
          : "bg-transparent border-b border-white/5"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo Oficial à Esquerda com marcação técnica */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/logo-dark.png"
            alt="Minerva Educação"
            className="h-8 w-auto object-contain transition-opacity group-hover:opacity-90"
          />
        </Link>

        {/* Links no Centro (Desktop) - Estilo Editorial Técnico */}
        <nav className="hidden lg:flex items-center gap-7 text-[11px] font-mono tracking-widest text-neutral-300 uppercase">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative py-1 transition-colors hover:text-white group"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          {user && (
            <Link
              to="/app"
              className="flex items-center gap-1.5 text-white font-bold hover:text-neutral-300 transition-colors"
            >
              <BookOpen className="h-3 w-3" />
              ÁREA DO ALUNO
            </Link>
          )}
          {isAdmin() && (
            <Link
              to="/admin"
              className="flex items-center gap-1.5 text-white font-bold hover:text-neutral-300 transition-colors"
            >
              <ShieldCheck className="h-3 w-3" />
              ADMIN
            </Link>
          )}
        </nav>

        {/* Ações à Direita (Desktop) */}
        <div className="hidden lg:flex items-center gap-4 font-mono text-xs">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 border border-neutral-800 bg-neutral-900/80 px-3 py-1.5 rounded-xs hover:border-neutral-600 transition-colors cursor-pointer">
                  <Avatar className="h-6 w-6 rounded-none">
                    <AvatarImage
                      src={profile?.avatar_url || ""}
                      alt={profile?.full_name || "Usuário"}
                    />
                    <AvatarFallback className="bg-neutral-800 text-white font-semibold text-[10px] rounded-none">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-white text-[11px] font-medium tracking-wide">
                    {profile?.full_name?.split(" ")[0] || "ALUNO"}
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 bg-neutral-900 border-neutral-800 text-white rounded-none"
                align="end"
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-xs font-bold text-white uppercase font-mono">
                      {profile?.full_name || "Aluno Minerva"}
                    </p>
                    <p className="text-[10px] text-neutral-400 truncate font-mono">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-neutral-800" />
                <DropdownMenuItem
                  asChild
                  className="focus:bg-neutral-800 focus:text-white rounded-none"
                >
                  <Link
                    to="/app"
                    className="cursor-pointer flex items-center gap-2 text-xs font-mono"
                  >
                    <LayoutDashboard className="h-3.5 w-3.5" />
                    <span>ÁREA DO ALUNO</span>
                  </Link>
                </DropdownMenuItem>
                {isAdmin() && (
                  <DropdownMenuItem
                    asChild
                    className="focus:bg-neutral-800 focus:text-white rounded-none"
                  >
                    <Link
                      to="/admin"
                      className="cursor-pointer flex items-center gap-2 text-xs font-mono"
                    >
                      <ShieldCheck className="h-3.5 w-3.5" />
                      <span>PAINEL ADMIN</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator className="bg-neutral-800" />
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="cursor-pointer text-red-400 focus:text-red-300 focus:bg-neutral-800 flex items-center gap-2 text-xs font-mono rounded-none"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>ENCERRAR SESSÃO</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-neutral-400 hover:text-white transition-colors tracking-widest text-[11px] px-2 py-1 font-mono uppercase"
              >
                ENTRAR
              </Link>
              <Link
                to="/register"
                className="group relative inline-flex items-center gap-2 bg-white text-neutral-950 hover:bg-neutral-200 font-mono font-bold text-[11px] tracking-wider uppercase px-4 py-2 transition-all"
              >
                <span>COMEÇAR AGORA</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          )}
        </div>

        {/* Botão Hamburger (Mobile) */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white hover:text-neutral-300 transition-colors focus:outline-none cursor-pointer"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-neutral-850 bg-neutral-950 px-6 pt-4 pb-8 space-y-5 text-white font-mono text-xs">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-neutral-300 hover:text-white py-2 border-b border-neutral-900 tracking-wider"
              >
                {link.label}
              </a>
            ))}
            {user && (
              <Link
                to="/app"
                onClick={() => setMobileMenuOpen(false)}
                className="text-white py-2 border-b border-neutral-900 flex items-center justify-between"
              >
                <span>ÁREA DO ALUNO</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>

          <div className="pt-2 flex flex-col gap-3">
            {user ? (
              <Button
                variant="outline"
                onClick={() => {
                  handleSignOut();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-xs font-mono font-bold justify-center text-red-400 border-red-500/30 bg-neutral-900 rounded-none"
              >
                ENCERRAR SESSÃO
              </Button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center border border-neutral-800 text-white font-mono uppercase text-xs hover:bg-neutral-900"
                >
                  ENTRAR
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center bg-white text-neutral-950 font-mono uppercase font-bold text-xs hover:bg-neutral-200"
                >
                  COMEÇAR AGORA →
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
