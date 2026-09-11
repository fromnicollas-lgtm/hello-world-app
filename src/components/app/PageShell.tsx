import React from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight, Hammer } from "lucide-react";
import { cn } from "../../lib/utils";

/* ------------------------------- Breadcrumbs ------------------------------ */

export interface Crumb {
  label: string;
  to?: string;
}

export const Breadcrumbs: React.FC<{ items: Crumb[]; className?: string }> = ({
  items,
  className,
}) => {
  if (items.length === 0) return null;
  return (
    <nav aria-label="Trilha de navegação" className={cn("min-w-0", className)}>
      <ol className="flex min-w-0 items-center gap-1 text-xs text-muted-foreground">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex min-w-0 items-center gap-1">
              {item.to && !last ? (
                <Link
                  to={item.to}
                  className="truncate rounded-sm transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={cn("truncate", last && "font-medium text-foreground")}
                  aria-current={last ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
              {!last ? <ChevronRight className="h-3 w-3 shrink-0 opacity-60" /> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

/* ------------------------------- PageHeader ------------------------------- */

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  breadcrumbs?: Crumb[];
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  actions,
  breadcrumbs,
}) => (
  <header className="space-y-3 border-b border-border/70 pb-5">
    {breadcrumbs?.length ? <Breadcrumbs items={breadcrumbs} /> : null}
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:flex-wrap sm:items-center sm:justify-between">
      <div className="min-w-0">
        <h1 className="font-heading truncate text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
    </div>
  </header>
);

/* --------------------------------- Section -------------------------------- */

interface SectionProps {
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({
  title,
  description,
  actions,
  children,
  className,
}) => (
  <section className={cn("space-y-4", className)}>
    {title || actions ? (
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:justify-between">
        <div className="min-w-0">
          {title ? (
            <h2 className="font-heading truncate text-sm font-semibold text-foreground">{title}</h2>
          ) : null}
          {description ? (
            <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {actions ? <div className="shrink-0">{actions}</div> : null}
      </div>
    ) : null}
    {children}
  </section>
);

/* -------------------------------- StatCard -------------------------------- */

interface StatCardProps {
  label: string;
  value: React.ReactNode;
  hint?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, hint, icon: Icon }) => (
  <div className="surface-card card-lift relative flex items-start justify-between gap-3 overflow-hidden rounded-xl p-5">
    <span aria-hidden className="aura -top-12 -left-8 h-24 w-24 opacity-20" />
    <div className="relative min-w-0">
      <p className="truncate text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
        {label}
      </p>
      <p className="font-heading mt-1 text-2xl font-bold tracking-tight text-foreground tabular-nums">
        {value}
      </p>
      {hint ? <p className="mt-0.5 text-[11px] text-muted-foreground">{hint}</p> : null}
    </div>
    {Icon ? (
      <div className="relative grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-primary/25 bg-primary/12 text-primary-soft">
        <Icon className="h-5 w-5" />
      </div>
    ) : null}
  </div>
);

/* ------------------------------ ProgressBar ------------------------------- */

export const ProgressBar: React.FC<{ value: number; label?: string; className?: string }> = ({
  value,
  label,
  className,
}) => {
  const safe = Math.max(0, Math.min(100, value));
  return (
    <div className={cn("space-y-1.5", className)}>
      {label ? (
        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
          <span className="truncate">{label}</span>
          <span className="font-mono font-semibold text-primary-soft tabular-nums">{safe}%</span>
        </div>
      ) : null}
      <div
        role="progressbar"
        aria-valuenow={safe}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? "Progresso"}
        className="relative h-2 w-full overflow-hidden rounded-full border border-border/60 bg-secondary/60"
      >
        <div
          className="minerva-progress h-full rounded-full transition-[width] duration-700 ease-out"
          style={{ width: `${safe}%` }}
        />
      </div>
    </div>
  );
};

/* ---------------------------- Módulo em construção ------------------------ */

interface ModulePlaceholderProps {
  title: string;
  description: string;
  bullets: string[];
}

export const ModulePlaceholder: React.FC<ModulePlaceholderProps> = ({
  title,
  description,
  bullets,
}) => (
  <div className="rounded-xl border border-dashed border-border bg-card/40 p-6 sm:p-8">
    <div className="flex items-center gap-2 text-muted-foreground">
      <Hammer className="h-4 w-4 shrink-0" />
      <span className="text-[11px] font-semibold tracking-widest uppercase">Em construção</span>
    </div>
    <h2 className="font-heading mt-3 text-base font-bold text-foreground">{title}</h2>
    <p className="mt-1 max-w-xl text-xs leading-relaxed text-muted-foreground sm:text-sm">
      {description}
    </p>
    <ul className="mt-5 grid gap-2 sm:grid-cols-2">
      {bullets.map((b) => (
        <li
          key={b}
          className="flex items-start gap-2 rounded-lg border border-border/60 bg-secondary/20 p-3 text-xs text-muted-foreground"
        >
          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-foreground/50" />
          <span className="leading-relaxed">{b}</span>
        </li>
      ))}
    </ul>
  </div>
);
