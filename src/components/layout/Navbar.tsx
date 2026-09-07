import React from "react";
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
import { ShieldCheck, LogOut, User, LayoutDashboard, Settings, BookOpen } from "lucide-react";

export const Navbar: React.FC = () => {
  const { user, profile, roles, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate({ to: "/" });
  };

  const initials = profile?.full_name
    ? profile.full_name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : user?.email?.slice(0, 2).toUpperCase() || "ME";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link to="/" className="group flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-foreground text-background font-semibold text-sm tracking-tight transition-transform group-hover:scale-105">
            M
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-foreground uppercase">
              Minerva Educação
            </span>
            <span className="text-[10px] uppercase font-medium tracking-widest text-muted-foreground -mt-1">
              Alta Performance Militar
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link
            to="/"
            className="transition-colors hover:text-foreground [&.active]:text-foreground"
          >
            Início
          </Link>
          <a href="/#concursos" className="transition-colors hover:text-foreground">
            Concursos
          </a>
          <a href="/#metodologia" className="transition-colors hover:text-foreground">
            Metodologia
          </a>
          {user && (
            <Link
              to="/app"
              className="flex items-center gap-1.5 text-foreground transition-colors hover:text-primary font-semibold"
            >
              <BookOpen className="h-4 w-4" />
              Área de Estudos
            </Link>
          )}
          {isAdmin() && (
            <Link
              to="/admin"
              className="flex items-center gap-1.5 text-foreground transition-colors hover:text-primary font-semibold"
            >
              <ShieldCheck className="h-4 w-4" />
              Administração
            </Link>
          )}
        </nav>

        {/* Auth CTA / User Dropdown */}
        <div className="flex items-center gap-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full ring-1 ring-border/80 hover:ring-border p-0"
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
              <DropdownMenuContent className="w-56" align="end" forceMount>
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
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">Entrar</Link>
              </Button>
              <Button
                size="sm"
                className="bg-foreground text-background hover:bg-foreground/90 font-medium"
                asChild
              >
                <Link to="/register">Criar Conta</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
