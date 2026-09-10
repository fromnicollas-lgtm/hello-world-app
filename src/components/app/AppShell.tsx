import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import {
  Bell,
  ChevronsLeft,
  ChevronsRight,
  CircleHelp,
  LogOut,
  Menu,
  Search,
  Settings,
  UserRound,
} from "lucide-react";
import { navGroups, allNavItems, type NavItem } from "./navigation";
import { Breadcrumbs, type Crumb } from "./PageShell";
import { useAuth } from "../../hooks/useAuth";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const COLLAPSE_KEY = "minerva_sidebar_collapsed";

function useActiveItem(pathname: string): NavItem | undefined {
  return useMemo(() => {
    const matches = allNavItems
      .filter((i) => pathname === i.to || pathname.startsWith(`${i.to}/`))
      .sort((a, b) => b.to.length - a.to.length);
    return matches[0];
  }, [pathname]);
}

function isItemActive(pathname: string, to: string) {
  if (to === "/app") return pathname === "/app" || pathname === "/app/";
  return pathname === to || pathname.startsWith(`${to}/`);
}

/* --------------------------------- Brand --------------------------------- */

const Brand: React.FC<{ collapsed?: boolean }> = ({ collapsed }) => (
  <Link
    to="/app"
    className="flex items-center gap-2.5 rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
    aria-label="Minerva Educação — Início"
  >
    <img src="/mascot.png" alt="" className="h-8 w-8 shrink-0 rounded-md object-contain" />
    {!collapsed ? (
      <span className="font-heading min-w-0 truncate text-sm font-bold tracking-tight text-foreground">
        Minerva
        <span className="ml-1 text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
          Educação
        </span>
      </span>
    ) : null}
  </Link>
);

/* ------------------------------- Nav content ------------------------------ */

const NavLinks: React.FC<{
  pathname: string;
  collapsed?: boolean;
  onNavigate?: () => void;
}> = ({ pathname, collapsed, onNavigate }) => (
  <nav aria-label="Navegação principal" className="space-y-6 px-3 py-4">
    {navGroups.map((group) => (
      <div key={group.label} className="space-y-1">
        {!collapsed ? (
          <p className="px-2 pb-1 text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
            {group.label}
          </p>
        ) : (
          <div className="mx-2 mb-2 h-px bg-border" aria-hidden />
        )}
        {group.items.map((item) => {
          const active = isItemActive(pathname, item.to);
          const link = (
            <Link
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "group relative flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm transition-colors",
                "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                collapsed && "justify-center px-0",
                active
                  ? "bg-secondary font-semibold text-foreground"
                  : "font-medium text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
              )}
            >
              {active ? (
                <span
                  aria-hidden
                  className="absolute top-1.5 bottom-1.5 -left-3 w-0.5 rounded-r-full bg-foreground"
                />
              ) : null}
              <item.icon className="h-4 w-4 shrink-0" strokeWidth={active ? 2.4 : 1.8} />
              {!collapsed ? <span className="min-w-0 truncate">{item.label}</span> : null}
            </Link>
          );

          return collapsed ? (
            <Tooltip key={item.to}>
              <TooltipTrigger asChild>{link}</TooltipTrigger>
              <TooltipContent side="right">{item.label}</TooltipContent>
            </Tooltip>
          ) : (
            link
          );
        })}
      </div>
    ))}
  </nav>
);

/* -------------------------------- User menu ------------------------------- */

const UserMenu: React.FC = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const name = profile?.full_name || user?.email?.split("@")[0] || "Aluno";
  const initials = (profile?.full_name || user?.email || "ME")
    .split(/[\s@.]+/)
    .filter(Boolean)
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleSignOut = async () => {
    await signOut();
    navigate({ to: "/", replace: true });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex max-w-[190px] items-center gap-2 rounded-full border border-border py-1 pr-2 pl-1 transition-colors hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          aria-label="Menu do usuário"
        >
          <Avatar className="h-7 w-7 shrink-0">
            <AvatarImage src={profile?.avatar_url ?? undefined} alt="" />
            <AvatarFallback className="text-[10px] font-semibold">{initials}</AvatarFallback>
          </Avatar>
          <span className="hidden min-w-0 truncate text-xs font-medium text-foreground sm:inline">
            {name}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="truncate text-xs">{user?.email ?? name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/app/perfil" className="cursor-pointer">
            <UserRound className="mr-2 h-4 w-4" /> Meu perfil
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/app/configuracoes" className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" /> Configurações
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/app/ajuda" className="cursor-pointer">
            <CircleHelp className="mr-2 h-4 w-4" /> Ajuda
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
          <LogOut className="mr-2 h-4 w-4" /> Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

/* -------------------------------- AppShell -------------------------------- */

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();
  const active = useActiveItem(pathname);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setCollapsed(window.localStorage.getItem(COLLAPSE_KEY) === "1");
  }, []);

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      const next = !prev;
      if (typeof window !== "undefined") {
        window.localStorage.setItem(COLLAPSE_KEY, next ? "1" : "0");
      }
      return next;
    });
  };

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  const crumbs: Crumb[] = useMemo(() => {
    if (!active || active.to === "/app") return [{ label: "Início" }];
    return [{ label: "Início", to: "/app" }, { label: active.label }];
  }, [active]);

  return (
    <TooltipProvider delayDuration={200}>
      <div className="min-h-screen bg-background text-foreground">
        {/* Sidebar — desktop */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 hidden shrink-0 flex-col border-r border-border bg-sidebar lg:flex",
            collapsed ? "w-[72px]" : "w-64",
          )}
        >
          <div
            className={cn(
              "flex h-16 items-center border-b border-border px-4",
              collapsed && "justify-center px-0",
            )}
          >
            <Brand collapsed={collapsed} />
          </div>
          <div className="flex-1 overflow-y-auto">
            <NavLinks pathname={pathname} collapsed={collapsed} />
          </div>
          <div className="border-t border-border p-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleCollapsed}
              className={cn("w-full justify-start gap-2 text-xs", collapsed && "justify-center")}
              aria-label={collapsed ? "Expandir menu lateral" : "Recolher menu lateral"}
            >
              {collapsed ? (
                <ChevronsRight className="h-4 w-4" />
              ) : (
                <>
                  <ChevronsLeft className="h-4 w-4" /> Recolher
                </>
              )}
            </Button>
          </div>
        </aside>

        {/* Drawer — mobile */}
        <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
          <SheetContent side="left" className="w-[86vw] max-w-xs bg-sidebar p-0">
            <SheetHeader className="h-16 justify-center border-b border-border px-4">
              <SheetTitle className="text-left">
                <Brand />
              </SheetTitle>
            </SheetHeader>
            <div className="h-[calc(100vh-4rem)] overflow-y-auto">
              <NavLinks pathname={pathname} onNavigate={() => setDrawerOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>

        <div className={cn("flex min-h-screen flex-col", collapsed ? "lg:pl-[72px]" : "lg:pl-64")}>
          {/* Topbar */}
          <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/85 px-4 backdrop-blur-md sm:px-6">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setDrawerOpen(true)}
              aria-label="Abrir menu de navegação"
            >
              <Menu className="h-5 w-5" />
            </Button>

            <div className="flex min-w-0 flex-1 items-center gap-3">
              <div className="hidden min-w-0 lg:block">
                <Breadcrumbs items={crumbs} />
              </div>
              <span className="font-heading min-w-0 truncate text-sm font-semibold lg:hidden">
                {active?.label ?? "Minerva"}
              </span>
            </div>

            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:inline-flex"
                aria-label="Busca global (em breve)"
                disabled
              >
                <Search className="h-4 w-4" />
              </Button>
              <NotificationsBell userId={user?.id} />
              <UserMenu />
            </div>
          </header>

          <main className="flex-1">
            <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
};
